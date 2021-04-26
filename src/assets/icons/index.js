import {createApp} from "vue"
// 导入svg组件
import SvgIcon from "@/components/SvgIcon"

// 注册为全局组件
createApp({}).component("svg-icon",SvgIcon)

// 将所有svg导入到icons/index.js中
const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context("./svg", false, /\.svg$/);
requireAll(req);
