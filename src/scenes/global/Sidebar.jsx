import * as React from "react";
import { useEffect, useState } from "react";
import isEmptyArray from "lodash/isEmpty";

import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, Icon } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
// import { styled } from '@mui/material/styles';
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import {
  collapseMenu,
  isAuthPageAtom,
  openSlidingMenu,
  sessionIdStatus,
} from "../../config/AppConfig";
import { useAtom } from "jotai";
import { BackButtonListener } from "../../components/BackButtonListener";
import {
  ADJUSTMENT_ROUTE,
  CREDIT_DEBIT_ROUTE,
  EARMARK_ROUTE,
  EXCLUSION_ROUTE,
  FINANCE_DASHBOARD,
  FREEZE_ACCOUNT_ROUTE,
  ON_HOLD_ROUTE,
  PAYOUT_DATES_ROUTE,
  PAYOUT_ROUTE,
  REPORTS_ROUTE,
  VALIDATION_ROUTE,
  WITHOLDING_TAX_ROUTE,
} from "../../constants/Constant";

/* NEW ICONS */

// import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";
import GppMaybeOutlinedIcon from "@mui/icons-material/GppMaybeOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import PauseOutlinedIcon from "@mui/icons-material/PauseOutlined";
import DoNotDisturbAltOutlinedIcon from "@mui/icons-material/DoNotDisturbAltOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import AcUnitOutlinedIcon from "@mui/icons-material/AcUnitOutlined";
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined";

import { useContext } from "react";
import { SidebarContext } from "../../scenes/global/context/sidebarContext.jsx";
import {
  ADJUSTMENT,
  CREDIT_DEBIT,
  DASHBOARD,
  EARMARK,
  EXCLUSION,
  FREEZE_ACCOUNT,
  ON_HOLD,
  PAYOUT,
  PAYOUT_DATES,
  REPORTS,
  VALIDATIONS,
  WITHOLDING_TAX,
} from "../../constants/Strings.jsx";
import ValidationScreen from "../validations/index.jsx";
import {
  getFromLocalStorage,
  getFromLocalStorageJsonObject,
} from "../../utils/localStorageUtils.js";
import {
  LOGIN_RESPONSE,
  SESSION_ID,
} from "../../constants/LocalStorageKeyValuePairString.jsx";
import DebugLog from "../../utils/DebugLog.jsx";

const Item = ({ title, to, icon, selected, setSelected, visible }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // useEffect(() => {
  //   resetAllConfigration();

  //   const basicAuthTokken = getFromLocalStorage(BASIC_AUTH_TOKKEN);
  //   if (basicAuthTokken === undefined || basicAuthTokken === null)
  //     requestBasicAuth(false);

  //   showNoInternetSnackBar();
  // }, [sessionIdState]);

  return (
    <div>
      {visible && (
        <MenuItem
          active={selected === title}
          style={{
            color: colors.grey[200],
            // fontFamily: 'Montserrat Bold',
            // fontWeight: "900"
          }}
          onClick={() => setSelected(title)}
          icon={icon}
        >
          <Typography
            sx={{
              fontSize: "0.9rem",
              fontWeight: "500",
            }}
          >
            {title}
          </Typography>
          <Link to={to} />
        </MenuItem>
      )}
    </div>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useAtom(collapseMenu);
  //const [isVisible, setIsVisible] = useAtom(false);

  const [selected, setSelected] = useState("Dashboard");
  const [isAuthPage, setAuthStatus] = useAtom(isAuthPageAtom);
  const [slidingMenuStatus, setSlidingMenu] = useAtom(openSlidingMenu);
  const [sessionIdState, setSessionIdState] = useAtom(sessionIdStatus);

  // menu hide / show logic
  const [Validations, setValidations] = useState(false);
  const [Formulas, setFormulas] = useState(false);
  const [Payout, setPayout] = useState(false);
  const [OnHold, setOnHold] = useState(false);
  const [Exclusions, setExclusions] = useState(false);
  const [PayoutDates, setPayoutDates] = useState(false);
  const [WithholdingTax, setWithholdingTax] = useState(false);
  const [Earmark, setEarmark] = useState(false);
  const [FreezeAccount, setFreezeAccount] = useState(false);
  const [DebitCredit, setDebitCredit] = useState(false);

  // reducer and context listening
  const [activeLinkIdx] = useState(3);
  const [sidebarClass, setSidebarClass] = useState("");
  const { isSidebarOpen } = useContext(SidebarContext);

  useEffect(() => {
    // setIsVisible(openSlidingMenu)
    //setSlidingMenu(openSlidingMenu);
    // setIsCollapsed(openSlidingMenu)

    if (isSidebarOpen) {
      setSidebarClass("sidebar-change");
    } else {
      setSidebarClass("");
    }

    DebugLog(
      "getFromLocalStorage(SESSION_ID)    " + getFromLocalStorage(SESSION_ID)
    );
    const sessionId = getFromLocalStorage(SESSION_ID);
    try {
      if (sessionId !== "") {
        const userDetails = getFromLocalStorageJsonObject(LOGIN_RESPONSE);
        DebugLog("userDetails from sidebar    " + JSON.stringify(userDetails));

        let incentives = [];
        let adjustments = [];

        //const menuArray = userDetails
        DebugLog("menuList from sidebar    " + JSON.stringify(userDetails));
        if (!isEmptyArray(userDetails)) {
          DebugLog("userDetails.length  ==== " + userDetails.length);
          let menuListSize = userDetails.length;
          if (menuListSize != null && menuListSize > 0) {
            userDetails.forEach((item, index) => {
              if (item.menuListName === "Incentive") {
                incentives = [...item.menuItem];
              } else if (item.menuListName === "Adjustment") {
                adjustments = [...item.menuItem];
              }
            });

            DebugLog(
              "incentives from sidebar    " + JSON.stringify(incentives)
            );

            DebugLog(
              "adjustments from sidebar    " + JSON.stringify(adjustments)
            );

            setPayout(false);
            setOnHold(false);
            setExclusions(false);
            setPayoutDates(false);
            setWithholdingTax(false);
            setEarmark(false);
            setFreezeAccount(false);

            incentives.forEach((item, index) => {
              if (item.menuName === "Payout") {
                setPayout(true);
              } else if (item.menuName === "On Hold") {
                setOnHold(true);
              } else if (item.menuName === "Exclusions") {
                setExclusions(true);
              } else if (item.menuName === "Payout Dates") {
                setPayoutDates(true);
              } else if (item.menuName === "Withholding Tax") {
                setWithholdingTax(true);
              } else if (item.menuName === "Validations") {
                setEarmark(true);
              } else if (item.menuName === "Formulas") {
                setFreezeAccount(true);
              }
            });
            setEarmark(false);
            setFreezeAccount(false);
            setDebitCredit(false);
            adjustments.forEach((item, index) => {
              if (item.menuName === "Earmark") {
                setEarmark(true);
              } else if (item.menuName === "Freeze Account") {
                setFreezeAccount(true);
              } else if (item.menuName === "Debit/Credit") {
                setDebitCredit(true);
              }
            });
          }
        }
      }
    } catch (error) {
      DebugLog(error);
    }
  }, [isSidebarOpen, openSlidingMenu, collapseMenu, sessionIdState]);

  return (
    <div className={`sidebar ${sidebarClass}`}>
      {!isAuthPage ? (
        <Box
          alignItems={"space-around"}
          // visibility={isVisible}
          sx={{
            "& .pro-sidebar-inner": {
              background: `${colors.white[50]} !important`,
              fontFamily: "Montserrat-Bold",
            },
            "& .pro-icon-wrapper": {
              backgroundColor: "transparent !important",
            },
            "& .pro-inner-item": {
              padding: "5px 35px 5px 20px !important",
            },
            "& .pro-inner-item:hover, ": {
              color: colors.redAccent[200] + "!important",
              // fontFamily: "Montserrat-Bold",
            },
            "& .pro-menu-item.active": {
              color: colors.redAccent[200] + "!important",
              fontFamily: "Montserrat-Bold",
              fontWeight: "900 !important",
            },
            //display: { xs: "none", sm: "block"},
            //height: "120vh",
            // position: "fixed",
            zIndex: "1000",
            // width: "270px",
          }}
        >
          <BackButtonListener></BackButtonListener>

          <ProSidebar collapsed={isCollapsed} sx={{ height: "100vh" }}>
            <Menu iconShape="square">
              {/* LOGO AND MENU ICON */}
              <MenuItem
                onClick={() => setIsCollapsed(!isCollapsed)}
                icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                style={{
                  margin: "10px 0 20px 0",
                  // color: colors.primary[200],
                }}
              >
                {!isCollapsed && (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    ml="15px"
                  >
                    <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                      <MenuOutlinedIcon />
                    </IconButton>
                  </Box>
                )}
              </MenuItem>

              {!isCollapsed && (
                <Box mb="25px">
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <img src="../../assets/common/Logo.svg" />
                    {/* <img src="../../assets/common/Attention.svg"/> */}
                  </Box>
                </Box>
              )}

              <Box pt={2} paddingLeft={isCollapsed ? undefined : "10%"}>
                <Item
                  title={DASHBOARD}
                  to={FINANCE_DASHBOARD}
                  icon={<OtherHousesOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  visible={true}
                  sx={{ fontWeight: "700", m: 1 }}
                />

                {/* <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Incentive
                </Typography> */}
                <Item
                  title={VALIDATIONS}
                  to={VALIDATION_ROUTE}
                  icon={<GppMaybeOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  visible={Validations}
                />

                <Item
                  title={PAYOUT}
                  to={PAYOUT_ROUTE}
                  icon={<CurrencyExchangeOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  visible={Payout}
                />
                <Item
                  title={ON_HOLD}
                  to={ON_HOLD_ROUTE}
                  icon={<PauseOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  visible={OnHold}
                />
                <Item
                  title={EXCLUSION}
                  to={EXCLUSION_ROUTE}
                  icon={<DoNotDisturbAltOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  visible={Exclusions}
                />
                {/* <Item
                  title="Formulas"
                  to="/calendar"
                  icon={<CalendarTodayOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                /> */}
                <Item
                  title={PAYOUT_DATES}
                  to={PAYOUT_DATES_ROUTE}
                  icon={<CalendarTodayOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  visible={PayoutDates}
                />
                <Item
                  title={WITHOLDING_TAX}
                  to={WITHOLDING_TAX_ROUTE}
                  icon={<PersonRemoveOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  visible={WithholdingTax}
                />
                {/* <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Reports
                </Typography> */}

                <Item
                  title={REPORTS}
                  to={REPORTS_ROUTE}
                  icon={<ArticleOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  visible={true}
                />

                <Item
                  title={ADJUSTMENT}
                  to={ADJUSTMENT_ROUTE}
                  icon={<CalculateOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  visible={true}
                />
                <Item
                  title={EARMARK}
                  to={EARMARK_ROUTE}
                  icon={<ContactsOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  visible={Earmark}
                />
                <Item
                  title={FREEZE_ACCOUNT}
                  to={FREEZE_ACCOUNT_ROUTE}
                  icon={<AcUnitOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  visible={FreezeAccount}
                />

                {/* <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Pages
                </Typography> */}
                <Item
                  title={CREDIT_DEBIT}
                  to={CREDIT_DEBIT_ROUTE}
                  icon={<PercentOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  visible={DebitCredit}
                />
                {/* <Item
                  title="Calendar"
                  to="/calendar"
                  icon={<CalendarTodayOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="FAQ Page"
                  to="/faq"
                  icon={<HelpOutlineOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Charts
                </Typography>
                <Item
                  title="Bar Chart"
                  to="/bar"
                  icon={<BarChartOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Pie Chart"
                  to="/pie"
                  icon={<PieChartOutlineOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Line Chart"
                  to="/line"
                  icon={<TimelineOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Geography Chart"
                  to="/geography"
                  icon={<MapOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                /> */}
              </Box>
            </Menu>
          </ProSidebar>
        </Box>
      ) : (
        ""
      )}
    </div>
  );
};

export default Sidebar;
