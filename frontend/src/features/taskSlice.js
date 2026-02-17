import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTasks = createAsyncThunk(
    "task/fetchTasks",
    async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/tasks",
                { withCredentials: true } 
            );
            // console.log(res.data)

            return  res.data; 
        } catch (err) {
            console.log(err)
        }
    }
);

const taskSlice = createSlice({
    name: "task",
    initialState: {
        allTasks: [],
        tasks: [],
        loading: false,
        error: "",
    },
    reducers: {
        serachForInp: (state, action) => {
            const search = action.payload.toLowerCase();

            if (search === "") {
                state.tasks = state.allTasks;
            } else {
                state.tasks = state.allTasks.filter((task) =>
                    task.title.toLowerCase().includes(search) 
                );
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.allTasks = action.payload;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { serachForInp } = taskSlice.actions;
export default taskSlice.reducer;
