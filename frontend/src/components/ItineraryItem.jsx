import "../styles/ItineraryItem.css";
import { useState, Fragment } from "react";
import { Menu, Transition } from '@headlessui/react';



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
    <div className="flex items-center">
      <div className="flex justify-center items-center bg-white w-8 h-8 p-2 rounded-full">
        <img src={icon} alt="" className="" />
      </div>
      <ul className="pl-2 m-1">
        <li className="flex justify-center items-center my-1">
          <span>{name}</span>


          {/* <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={handleShowMap} className="MenuItem"
              sx={{ fontSize: "15px" }}>
              <ListItemIcon><FmdGoodIcon fontSize="small" color="secondary" /></ListItemIcon>
              <ListItemText>Show on map</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleDeleteItem} className="MenuItem"
              sx={{ fontSize: "15px" }}>
              <ListItemIcon><DeleteIcon fontSize="small" color="secondary" /></ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
          </Menu> */}

          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="flex items-center rounded-full  text-gray-400 hover:text-gray-600 hover:bg-orange-100 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                </svg>
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${active ? 'bg-gray-200 font-medium text-gray-900' : 'text-gray-700'
                          } group flex w-full items-center px-2 py-2 text-sm`}
                        onClick={handleShowMap}
                      >
                        <p className="my-auto">Show on map</p>
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${active ? 'bg-red-500 font-medium text-white' : 'text-red-500'
                          } group flex w-full items-center px-2 py-2 text-sm`}
                        onClick={handleDeleteItem}
                      >
                        Delete
                      </button>
                    )}
                  </Menu.Item>

                </div>
              </Menu.Items>
            </Transition>
          </Menu>

        </li>
        {/* <li>{address}</li> */}
        {/* <li>Category: {type}</li> */}
      </ul>
    </div>
  );
}

export default ItineraryItem;