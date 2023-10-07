import Head from "next/head";
import { Text, Link, Navbar, Spacer, Divider, Button, Input, Card, Row } from "@nextui-org/react";
import { connect_ws, is_opened, recv, send,  } from "../ws"

function cookie_get(key) {
    try {
        var cookies={}
        for (var x in document.cookie.split("; ")) {
            var raw_data=document.cookie.split("; ")[x].split("=")
            cookies[raw_data[0]]=raw_data[1]
        }
        if (key in cookies) {
            return cookies[key]
        }
        return ""
    } catch {
        return ""
    }
}

function cookie_set(key,val) {
    try {
        document.cookie=`${key}=${val};expires=Thu, 01 Jan 2049 00:00:00 UTC`
    } catch {}
}

export default function Home() {
    connect_ws()
    return (
        <>
            <Head>
                <title>Nuxland</title>
            </Head>
            <div style={{height:"100vh",width:"100vw",backgroundImage:"url('bg.png')",backgroundSize:"100vh"}} className="wrapper">
                <Card css={{bgBlur:"#0f111466",padding:"$5",mw:"50vw"}}>
                    <Card.Header>
                        <Row>
                        <Text h2 color="primary">Nuxland</Text>
                        <img src="Vector.svg" height={"10%"}></img>
                        </Row>
                    </Card.Header>
                </Card>
            </div>
        </> 
    )
}