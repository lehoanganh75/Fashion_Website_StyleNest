import React, { useState } from "react";
import Button from "@mui/material/Button";
import { IoSearch } from "react-icons/io5";
import { RiMenu2Fill } from "react-icons/ri";
import { LiaAngleDownSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { MdOutlineRocketLaunch } from "react-icons/md";
import CategoryPanel from "./CategoryPanel";

const Navigation = () => {
  const [isOpenCatPanel, setisOpenCatPanel] = useState(false);

  const openCategoryPanel = () => {
    setisOpenCatPanel(true);
  };

  return (
    <div>
      <nav>
        <div className="container flex items-center justify-end gap-8 py-2">
          <div className="col_1 w-[20%] flex justify-center items-center">
            <Button onClick={openCategoryPanel} className="!text-black gap-2">
              <RiMenu2Fill className="text-[18px]" />
              Danh mục
              <LiaAngleDownSolid className="text-[13px] ml-auto font-bold" />
            </Button>
          </div>

          <div className="col_2 w-[60%] ">
            <ul className="flex items-center gap-6">
              <li className="list-none">
                <Link to="/" className="link transition text-[15px] font-[500]">
                  <Button className="link transaction !font-[500]">
                    Trang chủ
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link to="/" className="link transition text-[15px] font-[500]">
                  <Button className="link transaction !font-[500]">
                    Thời trang
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link to="/" className="link transition text-[15px] font-[500]">
                  <Button className="link transaction !font-[500]">Quần</Button>
                </Link>
              </li>
              <li className="list-none">
                <Link to="/" className="link transition text-[15px] font-[500]">
                  <Button className="link transaction !font-[500]">Áo</Button>
                </Link>
              </li>
              <li className="list-none">
                <Link to="/" className="link transition text-[15px] font-[500]">
                  <Button className="link transaction !font-[500]">
                    Tin tức
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link to="/" className="link transition text-[15px] font-[500]">
                  <Button className="link transaction !font-[500]">
                    Sự kiện
                  </Button>
                </Link>
              </li>
            </ul>
          </div>

          <div className="col_3 w-[20%]">
            <p className="text-[13px] font-[500] flex items-center gap-3 mb-0 mt-0">
              <MdOutlineRocketLaunch className="text-[18px]" />
              Giao hàng quốc tế miễn phí
            </p>
          </div>
        </div>
      </nav>

      <CategoryPanel
        isOpenCatPanel={isOpenCatPanel}
        setIsOpenCatPanel={setisOpenCatPanel}
      />
    </div>
  );
};

export default Navigation;
