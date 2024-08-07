import React, {useCallback, useMemo} from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import {selectTask, Task} from "../../../../components/task/task-slice";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {selectDrawerOpen} from "../left-section-slice";
import {SvgIconComponent} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import {PRIORITY} from "../../../../components/task/task-cards-list/task-card-edit/task-card-edit";

interface LeftSectionListItemProps {
    task: Task;
    icon: SvgIconComponent;
    done: boolean;
}

export const LeftSectionListItem = (props: LeftSectionListItemProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {task, icon: Icon, done} = props;
    const drawer = useAppSelector(selectDrawerOpen);


    const handleTaskClick = useCallback((taskId: string) => {
        if (!done) {
            dispatch(selectTask(taskId));
            navigate(`/tasks/${taskId}`);
        }
    }, [dispatch, navigate])

    const getPriorityLabel = useMemo(() => {
        const priorityItem = PRIORITY.find(item => item.value === task.priority);
        return priorityItem ? priorityItem.label : "";
    }, [PRIORITY, task]);

    return (
        <List sx={{padding: 0}}>
            <ListItem
                disablePadding
                sx={{
                    display: 'block',
                    "& .edit-icon": {
                        display: "none",
                    },
                    "& .completed-icon": {
                        display: "flex",
                    },
                    "&:hover": {
                        "& .edit-icon": {
                            display: "flex",
                        },
                        "& .completed-icon": {
                            display: "none",
                        },
                    },
                }}
                onClick={() => handleTaskClick(task.id)}
            >
                <ListItemButton
                    sx={{
                        minHeight: 30,
                        justifyContent: drawer ? 'initial' : 'center',
                        px: 2.5,
                        padding: '0.5rem 1rem',
                    }}
                >

                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: drawer ? 1 : 0,
                            justifyContent: 'center',
                        }}
                    >
                        <Box sx={{display: "flex"}}>
                            <EditIcon sx={{fontSize: "1.5rem"}} className="edit-icon"/>
                            <Icon
                                className="completed-icon"
                                sx={{
                                    color: `${getPriorityLabel}`,
                                    fontSize: "1.5rem"
                                }}
                            />
                        </Box>
                    </ListItemIcon>
                    <ListItemText
                        primary={task.name}
                        sx={{
                            opacity: drawer ? 1 : 0,
                            width: drawer ? "auto" : 0,
                            flexGrow: 0,
                            "& .MuiTypography-root": {
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }
                        }}
                    />
                </ListItemButton>
            </ListItem>
        </List>
    );
}