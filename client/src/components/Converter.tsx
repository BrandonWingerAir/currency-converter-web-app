import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import CardRow from "./CardRow"
import Loading from "./Loading"
import Error from "./Error"
import useSWR from "swr"
import { useState } from "react"
import modifyNames from "@/utils/modifyNames"
  
const BASE_URL = import.meta.env.VITE_BE_URL

const Converter = () => {
    const [isForward, setIsForward] = useState<boolean>(true);
    const [sourceCurrency, setSourceCurrency] = useState<string | undefined>();
    const [targetCurrency, setTargetCurrency] = useState<string | undefined>();
    const [exchangeRate, setExchangeRate] = useState<number>(1);
    const [amount, setAmount] = useState<string>('1');

    let sourceAmount;
    let targetAmount;

    if (isForward) {
        sourceAmount = amount;
        targetAmount = (Number(amount) / exchangeRate).toFixed(2)
    }

    const {
        data: namesData,
        error: namesError,
        isLoading: isNamesLoading
    } = useSWR(`${BASE_URL}/names`,
        (url) => fetch(url).then(async (res) => {
            const data = await res.json()
            console.log(modifyNames(data), 'modifyNames(data');
        })
    )

    const {
        data: currenciesData,
        error: currenciesError,
        isLoading: isCurrenciesLoading
    } = useSWR(`${BASE_URL}/currencies`,
        (url) => fetch(url).then((res) => res.json())
    )

    if (isCurrenciesLoading || isNamesLoading) {
        return <Loading/>
    }

    if (currenciesError || namesError) {
        return <Error message="Error! Failed to fetch data!"/>
    }
    
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