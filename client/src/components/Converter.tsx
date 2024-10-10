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
import { ChangeEvent, useEffect, useState } from "react"
import modifyNames from "@/lib/utils/modifyNames"
import calculateExchangeRate from "@/lib/utils/calculateRate"
  
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
        targetAmount = (Number(amount) * exchangeRate).toFixed(2)
    } else {
        targetAmount = amount;
        sourceAmount = (Number(amount) / exchangeRate).toFixed(2)
    }

    const {
        data: namesData,
        error: namesError,
        isLoading: isNamesLoading
    } = useSWR(`${BASE_URL}/names`,
        (url) => fetch(url).then(async (res) => {
            const data = await res.json()
            return modifyNames(data)
        })
    )

    const {
        data: currenciesData,
        error: currenciesError,
        isLoading: isCurrenciesLoading
    } = useSWR(`${BASE_URL}/currencies`,
        (url) => fetch(url).then((res) => res.json())
    )

    useEffect(() => {
        if (namesData && currenciesData) {         
            !sourceCurrency && setSourceCurrency(namesData?.[26].abbreviation)
            !targetCurrency && setTargetCurrency(namesData?.[149].abbreviation)

            setExchangeRate(calculateExchangeRate(sourceCurrency || namesData?.[0].abbreviation, targetCurrency || namesData?.[1].abbreviation, currenciesData))
        }
    }, [namesData, currenciesData, sourceCurrency, targetCurrency]);

    const handleChangeSourceAmount = (e: ChangeEvent<HTMLInputElement>) => {
        setIsForward(true)
        setAmount(e.target.value)
    }

    const handleChangeTargetAmount = (e: ChangeEvent<HTMLInputElement>) => {
        setIsForward(false)
        setAmount(e.target.value)
    }

    if (isCurrenciesLoading || isNamesLoading) {
        return <Loading/>
    }

    if (currenciesError || namesError) {
        return <Error message="Error! Failed to fetch data!"/>
    }
    
    return (
        <Card className="max-width-300px">
            <CardHeader className="border-b-2 p-2 m-2">
                <CardTitle>{sourceAmount} {sourceCurrency}</CardTitle>
                <CardDescription>{targetAmount} {targetCurrency}</CardDescription>
            </CardHeader>
            <CardContent>
                <CardRow
                    amount={sourceAmount}
                    handleChangeAmount={handleChangeSourceAmount}
                    selectedCurrency={sourceCurrency}
                    handleChangeCurrency={(value: string) => setSourceCurrency(value)}
                    currencyNames={namesData}
                />
                <CardRow
                    amount={targetAmount}
                    handleChangeAmount={handleChangeTargetAmount}
                    selectedCurrency={targetCurrency}
                    handleChangeCurrency={(value: string) => setTargetCurrency(value)}
                    currencyNames={namesData}
                />
            </CardContent>
        </Card>
    )
}

export default Converter