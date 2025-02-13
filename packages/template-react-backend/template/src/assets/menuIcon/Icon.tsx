/*
 * @Date: 2023-10-12 13:39:19
 * @Description: menu 图标管理， 复制过来的svg需要将fill改为currentColor
 */
/* 单位管理 */
const WorkerSvg = () => (
  <svg width="20" height="20" viewBox="0 0 20 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17.5 15.8333H19.1667V17.5H0.833344V15.8333H2.50001V3.33333C2.50001 2.8731 2.87311 2.5 3.33334 2.5H11.6667C12.1269 2.5 12.5 2.8731 12.5 3.33333V15.8333H14.1667V7.5H16.6667C17.1269 7.5 17.5 7.8731 17.5 8.33333V15.8333ZM5.83334 9.16667V10.8333H9.16668V9.16667H5.83334ZM5.83334 5.83333V7.5H9.16668V5.83333H5.83334Z"
      fill="currentColor"
    />
  </svg>
);
/* 项目管理 */
const ProjectSvg = () => (
  <svg width="20" height="20" viewBox="0 0 20 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.66667 8.33333V17.5H3.33333C2.8731 17.5 2.5 17.1269 2.5 16.6667V8.33333H6.66667ZM17.5 8.33333V16.6667C17.5 17.1269 17.1269 17.5 16.6667 17.5H8.33333V8.33333H17.5ZM16.6667 2.5C17.1269 2.5 17.5 2.8731 17.5 3.33333V6.66667H2.5V3.33333C2.5 2.8731 2.8731 2.5 3.33333 2.5H16.6667Z"
      fill="currentColor"
    />
  </svg>
);
/* 运输管理 */
const TransportSvg = () => (
  <svg width="20" height="20" viewBox="0 0 20 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13.3333 1.66663L17.5 5.83329V17.5068C17.5 17.9633 17.1292 18.3333 16.6722 18.3333H3.32783C2.87063 18.3333 2.5 17.9539 2.5 17.5068V2.49313C2.5 2.03667 2.87079 1.66663 3.32783 1.66663H13.3333ZM6.66667 6.66663V13.3333H8.33333V11.6666H13.3333V6.66663H6.66667ZM8.33333 8.33329H11.6667V9.99996H8.33333V8.33329Z"
      fill="currentColor"
    />
  </svg>
);
/* 消纳场管理 */
const AbsorptionFieldSvg = () => (
  <svg width="20" height="20" viewBox="0 0 20 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.61697 3.45497L9.51808 8.47992L4.56834 17.0573L1.66666 12.0333L6.61697 3.45497ZM8.43008 12.0333H18.3333L15.4317 17.0573H5.52947L8.43008 12.0333ZM12.0491 11.1999L7.09832 2.62085H12.9017L17.8524 11.1999H12.0491Z"
      fill="currentColor"
    />
  </svg>
);
/* 证件管理 */
const CardManageSvg = () => (
  <svg width="20" height="20" viewBox="0 0 20 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17.5 17.5H10.8333V5C10.8333 3.61929 11.9526 2.5 13.3333 2.5H17.5C17.9603 2.5 18.3333 2.8731 18.3333 3.33333V16.6667C18.3333 17.1269 17.9603 17.5 17.5 17.5ZM9.16667 17.5H2.5C2.03977 17.5 1.66667 17.1269 1.66667 16.6667V3.33333C1.66667 2.8731 2.03977 2.5 2.5 2.5H6.66667C8.04738 2.5 9.16667 3.61929 9.16667 5V17.5ZM9.16667 17.5H10.8333V19.1667H9.16667V17.5Z"
      fill="currentColor"
    />
  </svg>
);
/* 智能地磅 */
const Weighbridge = () => (
  <svg width="20" height="20" viewBox="0 0 20 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14.3333 5.5H16.8333L19.3333 8.87975V13.8333H17.6372C17.4349 15.2467 16.2193 16.3333 14.75 16.3333C13.2807 16.3333 12.0651 15.2467 11.8628 13.8333H7.63713C7.43495 15.2467 6.21937 16.3333 4.75 16.3333C3.28063 16.3333 2.06505 15.2467 1.86287 13.8333H1V3.83333C1 3.3731 1.3731 3 1.83333 3H13.5C13.9603 3 14.3333 3.3731 14.3333 3.83333V5.5ZM14.3333 7.16667V9.66667H17.6667V9.42917L15.9931 7.16667H14.3333Z"
      fill="currentColor"
    />
  </svg>
);

/* 原点信息二级菜单 */
const DocSvg = () => (
  <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <circle opacity="0.5" cx="3" cy="3" r="3" fill="currentColor" />
  </svg>
);

export { AbsorptionFieldSvg, CardManageSvg, DocSvg, ProjectSvg, TransportSvg, Weighbridge, WorkerSvg };
