import React from 'react';
import {useState,useEffect} from 'react';
import { Button } from 'react-bootstrap';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl'
import RadioGroup from '@mui/material/RadioGroup';
import API_ENDPOINTS from "../../../utils/api";
import { TagsInput } from "react-tag-input-component";
import { Avatar } from '@mui/material';
import { v4 as uuid } from 'uuid';
import axios from "axios";
import ChatContainer from './ChatContainer';
import {useMessagingStore} from './MessagingStore';
import {useUserStore} from '../../../utils/store'
// todo - cursor pagination for contacts 
export default function NewMessage(props) {
    const [users, setUsers] = useState([]);
    const allUsers = useUserStore(state => state.allUsers);
    const handleSubmit = async () => {
        console.log(users,"Anurima");
        const user_ids =  users && users.map(user => user.id);
        const usernames = users && users.map(user => user.username).join(',');
        const profileImages = users && users.map(user => user.profileImage)
        if (props.type=="group"){
            const form_obj = {
                group_key : usernames,
                users : user_ids,
              };
            console.log(user_ids);
            let found = 1;
            users.map((user)=> {
                if (user.id == props.currentUser._id){
                    found = 0;
                }
            })
        if (found == 0){
            await axios.post(API_ENDPOINTS.CREATEROOM, form_obj).then((response) => {
                props.socket.emit("group-created",{
                    users: user_ids
                });
            });
        }
        props.closeModal();
    };
        
    };
    const addList =(id, username, profileImage) => {
        const new_user = {id, username,profileImage}
        setUsers(prevUsers => [...prevUsers, new_user]);
    }

    return (
        <div style={{overflowY: 'auto'}}>
            <div className="header" style={{marginBottom: '20px', marginLeft:'120px'}}>
                <h2>{props.heading}</h2>
            </div>
            <div className="people-list">
                <TagsInput
                 value={users.length!=0 && users.map(user => user.username)}
                style={{marginBottom: '30px'}}
                name="users"
                placeHolder="Search.."
                />
            </div>
            <div className="people" style={{ }}>
            <FormControl>
            <RadioGroup
            name="radio-buttons-group">
                {allUsers && allUsers.map((contact, index) => (
                    <div className="contacts" key={index}
                    style={{display: 'flex', marginBottom: '20px', cursor:"pointer"}}
                    onClick={() => addList(contact._id, contact.username,
                    contact.profileImage)}>
                        <Avatar
                            sx={{ width: 56, height: 56 }}
                            alt={contact.username.substring(0, 2)}
                            src={API_ENDPOINTS.PROFILEPICVIEW + contact.profileImage}
                        />
                        <div className="username">
                            <h6>{contact.username}</h6>
                        </div>
                        <div>

                        </div>
                    </div>
                ))}
                </RadioGroup>
            </FormControl>
            </div>
            <div className="submit-button">
                <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={false}
                >
                    {props.text}
                </Button>
            </div>
        </div>
    );
}
