import Head from "next/head";
import { Text, Link, Navbar, Spacer, Divider, Button, Input, Card} from "@nextui-org/react";
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
                <title></title>
            </Head>
            {is_opened.toString()}
            <Button onClick={()=>{
                send("text")
                send("hi")
            }}></Button>
        </> 
    )
}