import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import CardRow from "./CardRow"
import useSWR from "swr"
  
const BASE_URL = import.meta.env.VITE_BE_URL

console.log(BASE_URL, 'BASE_URL');

const Converter = () => {
    const {
        data: namesData,
        error: namesError,
        isLoading: isNamesLoading
    } = useSWR(`${BASE_URL}/names`,
        (url) => fetch(url).then((res) => res.json())
    )

    const {
        data: currenciesData,
        error: currenciesError,
        isLoading: isCurrenciesLoading
    } = useSWR(`${BASE_URL}/currencies`,
        (url) => fetch(url).then((res) => res.json())
    )

    console.log(currenciesData, namesData, 'DATA');
    
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