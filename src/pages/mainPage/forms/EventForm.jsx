import {Box, Dialog, DialogContent, DialogContentText, DialogTitle, FormControl} from "@mui/material";
import {useApp} from "../../../contexts/AppContext.jsx";
import {useAlert} from "../../../contexts/AlertContext.jsx";

export function EventForm({ open, setOpen, selectedItem }) {
    const { dadosUsuario } = useApp();
    const { exibirDialog, handleCloseDialog, exibirAlerta } = useAlert();

    const isEditAction = !!selectedItem;

    return (
        <Dialog open={open} fullWidth maxWidth="md">
            {/* TODO - HandleSubmit */}
            <form>
                {isEditAction
                    ? <DialogTitle>Editar</DialogTitle>
                    : <DialogTitle>Cadastrar</DialogTitle>
                }
                <DialogContent>
                    <DialogContentText sx={{ mb: 2 }}>Preencha corretamente os dados</DialogContentText>
                </DialogContent>

                <Box sx={{ p: 2, backgroundColor: "#fafafa" }} >
                    <FormControl variant="standard" fullWidth >

                    </FormControl>
                </Box>
            </form>
        </Dialog>
    );
}