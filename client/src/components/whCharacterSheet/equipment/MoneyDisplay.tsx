import { Stack, Chip } from "@mui/material";
import { Money } from "../../../types/pcsheet"
import { CoinIcon } from "../../icons/CoinIcon";


interface Props {
    money: Money,
}

// const MoneyIcon = () => {

//     return (
//         <SvgIcon  viewBox="0 0 24 24">
//             <Coin/>           
//         </SvgIcon>
//     )
// }

const MoneyDisplay: React.FC<Props> = (props) => {


    return (
        <>
            <Stack direction="row" justifyContent="space-around" alignItems="center">
                <Chip icon={<CoinIcon color="gold" />} label={props.money.gc + " zk"} sx={{width: "20%"}}/>
                <Chip icon={<CoinIcon color="#C0C0C0" />} label={props.money.sh + " s"} sx={{width: "20%"}}/>
                <Chip icon={<CoinIcon color="#B87333" />} label={props.money.pn + " p"} sx={{width: "20%"}}/>
            </Stack>
        </>
    )
}

export { MoneyDisplay };