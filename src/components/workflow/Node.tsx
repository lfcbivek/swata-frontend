import { PlusSquare } from "@phosphor-icons/react";
import { useCallback, useState } from "react";
import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Card,
    CardContent,
  } from "@/components/ui/card"

import { availableIntegrations, type AvailableIntegration } from "@/common/utils";

import './Node.scss'


type AddButtonProps = {
    onAdd: (integration: AvailableIntegration) => void
}
const AddButtonNode = (props: AddButtonProps) => {
    const [open, setOpen] = useState(false);
    const [selectedNode, setSelectedNode] = useState("");

    const onClick = (e: ReactMouseEvent<HTMLDivElement>) => {
        if(selectedNode !== "") {
            e.preventDefault();
            e.stopPropagation();
            setOpen(!open);
            props.data.onAdd(selectedNode);
            setSelectedNode("");
        }
    }

    return(
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <PlusSquare size={80} weight="fill" />
            </DialogTrigger>
            <DialogContent className="w-[600px] h-[500px]">
            <DialogHeader>
            <DialogTitle>Add a node</DialogTitle>
            <DialogDescription>
                <Select onValueChange={(value: AvailableIntegration) => setSelectedNode(value)}>
                    <SelectTrigger className="w-[400px]">
                        <SelectValue placeholder="Select a node" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {
                                availableIntegrations.map(integration => (
                                    <div>
                                        <SelectItem value={integration}>
                                            <img src="./slack.png" width={40} height={40} />
                                            {integration.label}
                                        </SelectItem>
                                    </div>
                                ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </DialogDescription>
            </DialogHeader>
            <Button onClick={onClick}>Add</Button>
        </DialogContent>
        </Dialog>
    )
}

const ActionNode:React.FC<any> = (props: NodeProps) => {
    console.log(props)
    return (
        <Card className="bg-transparent">
            <CardContent className="action-node">
                <img src={props.data.icon} width={100} height={100} />
                <h2>{props.data.label}</h2>
            </CardContent>
        </Card>
    )
}

export {AddButtonNode, ActionNode};