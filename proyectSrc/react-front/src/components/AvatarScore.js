import React from 'react'
import { Avatar, Badge } from '@mui/material';

import MailIcon from '@mui/icons-material/Mail';
import { styled } from '@mui/material/styles';
const perfilTam = 240/2;
const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 240*0.2,
    height: 240*0.2,
    border: `1px solid ${theme.palette.background.paper}`,
  }));
export default function AvatarScore() {
  return (
    
        <Badge 
            overlap="circular"
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            
            badgeContent={
                <SmallAvatar src='https://i.pinimg.com/originals/d5/16/80/d5168001add6c3c50a1ea9328b466013.png'></SmallAvatar>
            }
            >
            
            <Avatar 
            sx={{ width:perfilTam , height: perfilTam }}
            ></Avatar>
        </Badge>  
    
  )
}
