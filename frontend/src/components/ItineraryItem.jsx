import "../styles/ItineraryItem.css";
import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';


function ItineraryItem({ handleDelete, handleMarkerClick, item }) {
  const { address, phone, name, rating, user_ratings_total, url, opening_hours, website, type, photos, icon } = item;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDeleteItem = () => {
    handleDelete(url);
    setAnchorEl(null);
  };
  const handleShowMap = () => {
    handleMarkerClick(item);
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="Itinerary_Item">
      <div className="Itinerary_Item_img_div">
        <img src={icon} alt="" className="Itinerary_Item_img" />
      </div>
      <ul>
        <li>
          <span>{name}</span>
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={handleShowMap} className="MenuItem"
              sx={{ fontSize: "15px" }}>
              Show on map
            </MenuItem>
            <MenuItem onClick={handleDeleteItem} className="MenuItem"
              sx={{ fontSize: "15px" }}>
              Delete
            </MenuItem>
          </Menu>
        </li>
        {/* <li>{address}</li> */}
        {/* <li>Category: {type}</li> */}
      </ul>
    </div>
  );
}

export default ItineraryItem;