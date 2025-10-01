import {Controller, useForm} from "react-hook-form";
import {useSearchParams} from "react-router-dom";
import {Card, Collapse, Grid, TextField} from "@mui/material";
import {useApp} from "../../contexts/AppContext.jsx";
import {TableFilterButtons} from "./TableFilterButtons.jsx";
import dayjs from "dayjs";
import DateRangePicker from "../datePicker/DateRangePicker.jsx";

export function TableFilter({
                                isLoading,
                                communities,
                                itemName,
                                hasDate,
                                hasCommunity,
}) {
    const { setCommunityIdSession } = useApp();

    const [searchParams, setSearchParams] = useSearchParams();

    const communityId = searchParams.get('communityId');
    const nome = searchParams.get("nome");
    const data_inicio = searchParams.get("data_inicio");
    const data_fim = searchParams.get("data_fim");

    const perPage = searchParams.get("perPage");

    const { handleSubmit, control, setValue, watch, reset } = useForm({
        defaultValues: {
            communityId: communityId ?? "",
            nome: nome ?? "",
            data_inicio: data_inicio ?? "",
            data_fim: data_fim ?? "",
        },
    });

    const dateInicio = watch("data_inicio");
    const dateFim = watch("data_fim");

    function handleSubmitFilter(data) {
        for (const key in data) {
            if (data[key] === "") {
                delete data[key];
            }
        }

        const queryFilters = {
            ...data,
            page: "1",
            perPage: perPage ?? "10",
        };

        setSearchParams(queryFilters);

        if (data.communityId) setCommunityIdSession(data.communityId);
    }

    return (
        <Grid container size={12} spacing={2} marginBottom={3} alignItems={'flex-start'} justifyContent="space-between">
            <Grid item size={8} container spacing={2}>
                {hasCommunity && (
                    <Grid item size={4}>
                        <Controller
                            name="communityId"
                            control={control}
                            defaultValue={communityId}
                            render={({ field }) => (
                                <TextField
                                    select
                                    label="Comunidade"
                                    fullWidth
                                    size="small"
                                    {...field}
                                >
                                </TextField>
                            )}
                        />
                    </Grid>
                )}

                <Grid item size={4}>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                label={"Nome " + itemName}
                                fullWidth
                                size="small"
                                {...field}
                            />
                        )}
                    />
                </Grid>

                {hasDate && (
                    <Grid item xs={12} md={4}>
                        <DateRangePicker
                            value={[
                                dateInicio ? dayjs(dateInicio).format("YYYY-MM-DD") : null,
                                dateFim ? dayjs(dateFim).format("YYYY-MM-DD") : null,
                            ]}
                            onChange={(value) => {
                                const [start, end] = value;
                                setValue("data_inicio", start ? dayjs(start).format("YYYY-MM-DD") : "");
                                setValue("data_fim", end ? dayjs(end).format("YYYY-MM-DD") : "");
                            }}
                            onReset={() => {
                                setValue("data_inicio", "");
                                setValue("data_fim", "");
                            }}
                        />
                    </Grid>
                )}
            </Grid>

            <Grid item size={4}>
                <TableFilterButtons
                    isLoading={isLoading}
                    handleClearFilters={() => {
                        setSearchParams((state) => {
                            state.delete('communityId');
                            state.delete('nome');
                            state.delete('data_inicio');
                            state.delete('data_fim');
                            state.set('page', '1')
                            return state;
                        });

                        reset({
                            communityId: '',
                            nome: '',
                            data_inicio: '',
                            data_fim: '',
                        });
                    }}
                />
            </Grid>
        </Grid>
    );
}

