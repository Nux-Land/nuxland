import axios from "axios"
import { useState } from "react"
var debug=true

var websocket=false
var last_message={"id":"","data":""}
export var [is_opened,set_is_opened]=[0,0]

export async function connect_ws() {
    if (is_opened==0) {
        [is_opened,set_is_opened]=useState(false)
    }
    if (websocket==false) {
        if (debug) {
            var node_url="ws://127.0.0.1:8080"
        } else {
            var node_url=(await axios.get("https://nuxland-api.vercel.app")).data
        }
        if (websocket==false) {
            var x=new WebSocket(node_url)
            if (websocket==false) {
                websocket=x
            }
        }
        websocket.addEventListener("open",()=>{
            try {
                websocket.send("client")
            } catch {
                return
            }
            set_is_opened(true)
        })
        websocket.addEventListener("message",(event)=>{
            last_message["data"]=event.data
            last_message["id"]=crypto.randomUUID()
        })
        websocket.addEventListener("close",()=>{
            set_is_opened(false)
        })
        return websocket
    } else {
        return websocket
    }
}

export async function recv() {
    var initial_uuid=last_message.id
    while (initial_uuid==last_message.id) {
        await new Promise(resolve => setTimeout(resolve, 100))
    }
    return last_message.data
}

export async function send(data) {
    while (true) {
        try {
            websocket.send(data)
            console.log("hi")
            break
        } catch {
            connect_ws()
        }
    }
}

export async function get_websocket() {
    return connect_ws()
}