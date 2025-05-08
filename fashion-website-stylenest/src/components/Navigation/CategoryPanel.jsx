import * as React from "react";
import {
  Box,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Checkroom as CheckroomIcon,
  Wc as WcIcon,
  LocalMall as LocalMallIcon,
  Diamond as DiamondIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom"; // Import Link

const CategoryPanel = (props) => {
  const [openMen, setOpenMen] = React.useState(false);
  const [openWomen, setOpenWomen] = React.useState(false);

  // Hàm tạo slug từ tên sản phẩm
  const createSlug = (name) => {
    const firstWord = name.split(' ')[0];
    return firstWord ? firstWord.charAt(0).toLowerCase() : '';
  };

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => props.setIsOpenCatPanel(false)}
    >
      {/* Tiêu đề StyleNest */}
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight="bold" textAlign="center">
          StyleNest
        </Typography>
      </Box>
      <Divider />

      <List>
        {/* Thời trang nam - có dropdown */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={(e) => {
              e.stopPropagation();
              setOpenMen(!openMen);
            }}
          >
            <ListItemIcon>
              <WcIcon />
            </ListItemIcon>
            <ListItemText primary="Thời trang nam" />
            {openMen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openMen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            {["Áo sơ mi", "Quần jeans", "Áo khoác"].map((item) => (
              <ListItemButton
                key={item}
                component={Link}
                to={`/product/fashion?name=${createSlug(item)}`} // Đường dẫn đã cập nhật
                onClick={() => props.setIsOpenCatPanel(false)}
              >
                <ListItemText primary={item} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>

        {/* Thời trang nữ - có dropdown */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={(e) => {
              e.stopPropagation();
              setOpenWomen(!openWomen);
            }}
          >
            <ListItemIcon>
              <CheckroomIcon />
            </ListItemIcon>
            <ListItemText primary="Thời trang nữ" />
            {openWomen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openWomen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            {["Đầm", "Áo kiểu", "Chân váy"].map((item) => (
              <ListItemButton
                key={item}
                component={Link}
                to={`/product/fashion?name=áo`} // Đường dẫn cho từng mục con
                onClick={() => props.setIsOpenCatPanel(false)}
              >
                <ListItemText primary={item} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </List>

      <Divider />

      <List>
        {[
          { text: "Hàng mới về", icon: <LocalMallIcon />, path: "/product/fashion" },
          { text: "Khuyến mãi", icon: <DiamondIcon />, path: "/product/deal" },
          { text: "Bán chạy", icon: <CheckroomIcon />, path: "/product/deal" },
        ].map(({ text, icon, path }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              component={Link}
              to={path}
              onClick={() => props.setIsOpenCatPanel(false)}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer
        open={props.isOpenCatPanel}
        onClose={() => props.setIsOpenCatPanel(false)}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default CategoryPanel;
