import asyncio,time,json,websockets,litedb,hashlib,random,threading,ngrok,uuid,requests
ngrok.set_auth_token(open("ngrok_token").read().split("=")[1])
from websockets.server import serve
from websockets.sync import client as wsclient

tunnel=ngrok.connect(8080)

nodes=litedb.get_conn("nodes")
users=litedb.get_conn("users")

class Message:
    def __init__(self,sender,content,timestamp) -> None:
        self.sender=sender
        self.content=content
        self.timestamp=timestamp
    def json(self):
        return {"sender":self.sender,"content":self.content,"timestamp":self.timestamp}

class Channel:
    def __init__(self,id,name,messages=[]) -> None:
        self.id=id
        self.name=name
        self.messages=messages
    def json(self):
        messages_json=[x.json() for x in self.messages]
        return {"id":self.id,"name":self.name,"messages":messages_json}

class Project:
    def __init__(self,owner,name,visibility):
        self.name=name
        self.owner=owner
        self.collaborators=[owner]
        self.files={}
        self.live=""
        self.channels=[]
        self.fund_target=0
        self.fund_done=0
        self.meeting_id=""
        self.versions={}
        self.votes=0
        self.roles={}
        self.visibility=visibility
    def json(self):
        return {"name":self.name,"owner":self.owner,"collaborators":self.collaborators,"files":self.files,
                "live":self.live,"channels":self.channels,"fund_target":self.fund_target,"fund_done":self.fund_done,
                "meeting_id":self.meeting_id,"versions":self.versions,"votes":self.votes,"roles":self.roles,
                "visibility":self.visibility}

class User:
    def __init__(self,name,password,skills=[],image="",address="") -> None:
        self.name=name
        self.password=password
        self.id=uuid.uuid4().__str__()
        self.address=address
        self.skills=skills
        self.projects=[]
        self.respect=0
        if image=="":
            self.image="https://api.dicebear.com/6.x/adventurer/svg?seed="
        else:
            self.image=image
    def json(self):
        return {
            "name":self.name,
            "password":self.password,
            "id":self.id,
            "address":self.address,
            "skills":self.skills,
            "projects":self.projects,
            "respect":self.respect,
            "image":self.image
        }

def hash(x):
    return hashlib.sha256(x.encode()).hexdigest()

connections={}

async def recv(id):
    while True:
        try:
            data=await connections[id]["object"].recv()
        except:
            if id in connections:
                del connections[id]
            return
        return data

async def client_thread(websocket: wsclient.ClientConnection):
    try:
        websocket.solution=False
        global connections
        admin=False
        id=str([websocket.id,websocket.remote_address])
        uid=websocket.id
        print("Client Connected",websocket.id,websocket.remote_address)
        connections[id]={"status":"unchecked","authority":"","data":{},"solution":False,"object":websocket,"auth":False}
        connection_type=await recv(id)
        print(connection_type)
        if connection_type=="load":
            node_token=await recv(id)
            if node_token!=nodes.get("admin_token"):
                await websocket.close()
                return
            else:
                await websocket.send(str(len(connections.keys())))
                return
        if connection_type=="admin":
            node_token=await recv(id)
            if node_token!=nodes.get("admin_token"):
                await websocket.close()
                return
            else:
                admin=True
                connections[id]["status"]="checked"
                connections[id]["authority"]="admin"
        elif connection_type=="client":
            connections[id]["status"]="checked"
            connections[id]["authority"]="client"
        else:
            await websocket.close()
            return
        user_details=None
        while id in connections:
            message=await recv(id)
            print(message)
            if message=="register":
                user_name=await recv(id)
                password=hash(await recv(id))
                image=await recv(id)
                users_list=json.loads(users.get("users"))
                print(users_list)
                if user_name not in users_list:
                    users.set(user_name,User(user_name,password,image=image).json())
                    users.set("users",json.dumps(users_list+[user_name]))
                    user_details=User(user_name,password)
                    await websocket.send("true")
                    connections[id]["auth"]=True
                else:
                    await websocket.send("false")
            elif message=="login":
                user_name=await recv(id)
                password=await recv(id)
                users_list=json.loads(users.get("users"))
                if user_name not in users_list:
                    await websocket.send("false")
                    continue
                users_data=users.get(user_name)
                if users_data["password"]==hash(password):
                    user_details=User(users_data["name"],users_data["password"])
                    await websocket.send("true")
                    connections[id]["auth"]=True
                else:
                    await websocket.send("false")
            elif message=="text":
                print(await recv(id))
            elif message=="load" and admin:
                await websocket.send(str(len(connections.keys())))
            else:
                return
    except Exception as e:
        print(e,"\n",id)
        import traceback
        traceback.print_exc()
        if id in connections:
            del connections[id]

print("Tunnel on",tunnel.url())

def adder():
    while True:
        prev=json.loads(nodes.get("nodes"))
        requests.get(tunnel.url(),headers={"ngrok-skip-browser-warning":"true"})
        if tunnel.url().replace("https","wss") not in prev:
            prev+=[tunnel.url().replace("https","wss")]
            nodes.set("nodes",json.dumps(prev))
        time.sleep(5)

async def x(w):
    print(w.id)

async def main():
    async with serve(client_thread, "0.0.0.0", 8080):
        await asyncio.Future()

def commands():
    while True:
        command=input(">> ")
        if command=="connections":
            for x in connections:
                copy=connections[x].copy()
                del copy["object"]
                print(copy)

threading.Thread(target=commands).start()
threading.Thread(target=adder).start()
asyncio.run(main())