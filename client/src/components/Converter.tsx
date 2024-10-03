import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import CardRow from "./CardRow"
  

const Converter = () => {
    return (
        <Card className="max-width-300px">
            <CardHeader className="border-b-2 p-2 m-2">
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
                <CardRow/>
                <CardRow/>
            </CardContent>
        </Card>
    )
}

export default Converter