import {useApp} from "../../contexts/AppContext.jsx";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {Controller, useForm} from "react-hook-form";
import {Card, Collapse, Grid, MenuItem, TextField} from "@mui/material";
import Index from "../datePicker/index.jsx";
import dayjs from 'dayjs';
import {TableFilterButtons} from "./TableFilterButtons.jsx";

export function TableFilter({
                                isOpenFilters,
                                isLoadingList,
                                communities,
                                item,
                                hasDate
                            }) {
    const {setCommunityIdSession} = useApp();

    const [searchParams, setSearchParams] = useSearchParams();
    const [isSearched, setIsSearched] = useState(false);

    const [dateRange, setDateRange] = useState([null, null]);

    const communityId = searchParams.get("communityId");
    const name = searchParams.get("name");
    const initialDate = searchParams.get("initialDate");
    const finishDate = searchParams.get("finishDate");

    const perPage = searchParams.get('perPage');

    const {
        handleSubmit,
        reset,
        control,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        reset({
            communityId: communityId ?? '',
            name: name ?? '',
        })
    }, [communityId, name, reset]);

    function handleSubmitFilter(data) {
        for (const key in data) {
            if (data[key] === '') {
                delete data[key];
            }

            const queryFilters = {
                ...data,
                page: '1',
                perPage: perPage ?? '10',
            }

            setSearchParams(queryFilters);

            if (data.communityId) setCommunityIdSession(data.communityId);
        }
    }

    return (
        <Grid item size={12} component="form" onSubmit={handleSubmit(handleSubmitFilter)}>
            <Collapse in={isOpenFilters}>
                <Card variant="outlined" sx={{ padding: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item size={6}>
                            <Controller
                                name="communityId"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        select
                                        label="Comunidade"
                                        fullWidth
                                        size="small"
                                        {...field}
                                    >
                                        {/*{communities.length > 0 && communities.map((option) => (*/}
                                        {/*    <MenuItem key={option.id} value={option.id}>*/}
                                        {/*        {option.name}*/}
                                        {/*    </MenuItem>*/}
                                        {/*))}*/}
                                    </TextField>
                                )}
                            />
                        </Grid>

                        <Grid item size={6}>
                            <Controller
                                name="name"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        label={"Nome " + item}
                                        fullWidth
                                        size="small"
                                        {...field}
                                    />
                                )}
                            />
                        </Grid>

                        {hasDate && (
                            <Grid item size={6}>
                                <Index
                                    value={dateRange}
                                    bgColor='#fff'
                                    onChange={(value) => {
                                        setDateRange(value);
                                        const [start, end] = value;
                                        setValue('data_inicio', start ? dayjs(start).format('YYYY-MM-DD') : '');
                                        setValue('data_fim', end ? dayjs(end).format('YYYY-MM-DD') : '');
                                        setIsSearched(false);
                                    }}
                                    onReset={() => {
                                        setDateRange([null, null]);
                                        setValue('data_inicio', '');
                                        setValue('data_fim', '');
                                        setIsSearched(false);
                                    }}
                                    hasError={errors.data_inicio || errors.data_fim}
                                />
                            </Grid>
                        )}

                        <Grid size={6}>
                            <TableFilterButtons
                                isLoading={isLoadingList}
                                handleClearFilters={() => {
                                    setSearchParams((state) => {
                                        state.delete('name')
                                        state.delete('page', '1')
                                        return state
                                    })

                                    reset({
                                        communityId: communityId ?? '',
                                        name: ''
                                    })
                                }}
                            />
                        </Grid>
                    </Grid>
                </Card>
            </Collapse>
        </Grid>
    );
}