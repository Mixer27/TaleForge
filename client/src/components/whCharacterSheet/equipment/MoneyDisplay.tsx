import { Stack, Chip } from "@mui/material";
import { Money } from "../../../types/pcsheet"
import { CoinIcon } from "../../icons/CoinIcon";
import { useState } from "react";
import { MoneyDialog } from "./MoneyDialog";


interface Props {
    money: Money,
    handleChange: (money: Money) => void,
}


const MoneyDisplay: React.FC<Props> = (props) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleClick = () => {
        setIsDialogOpen(true);
    }

    const handleClose = () => {
        setIsDialogOpen(false);
    }

    return (
        <>
            <Stack direction="row" justifyContent="space-around" alignItems="center" >
                <Chip icon={<CoinIcon color="gold" />} label={props.money.gc + " zk"} sx={{ width: "20%" }} onClick={handleClick} />
                <Chip icon={<CoinIcon color="#C0C0C0" />} label={props.money.sh + " s"} sx={{ width: "20%" }} onClick={handleClick} />
                <Chip icon={<CoinIcon color="#B87333" />} label={props.money.pn + " p"} sx={{ width: "20%" }} onClick={handleClick} />
            </Stack>
            {isDialogOpen && <MoneyDialog
                headerName="Majątek"
                money={props.money}
                isOpen={isDialogOpen}
                handleChange={props.handleChange}
                handleClose={handleClose}
            />}
        </>
    )
}

export { MoneyDisplay };