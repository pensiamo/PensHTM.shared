import {
    faTools, faSearch, faEraser, faCheckCircle, faTimesCircle, faEdit, faCheck, faMinusCircle, faClipboardList,
    faSitemap, faChevronUp, faChevronDown, faUserTag, faUserLock, faUsersCog, faUserFriends, faUserTimes, faUserMinus,
    faUserPlus, faUserCheck, faDatabase, faUserEdit, faSave, faUndo, faFileImport, faChevronRight, faExclamationCircle,
    faExclamationTriangle, faSync, faFolderPlus, faCogs, faTag, faIndustry, faBriefcase, faPlusCircle,
    faSquare, faCheckSquare, faInfoCircle, faTimes, faDownload, faUpload, faClone, faEllipsisH, faStepForward,
    faBarcode, faHashtag, faBan, faClock, faCalendarCheck, faAlignJustify, faHandPaper, faCopy, faCommentDots,
    faPencilAlt, faFolder, faTh, faBookOpen, faLink, faList, faThumbsUp, faCog, faFile, faWrench, faPhone, faGlobe,
    faEye
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

const addFontAwesomeIconsToLibrary = () => {
    // library.add(comma delimited list of imports from
    // '@fortawesome/free-solid-svg-icons'); then used in component...  import {
    // FontAwesomeIcon } from '@fortawesome/react-fontawesome'  <FontAwesomeIcon
    // icon='check-square' size='lg' />
    library.add(faTools, faSearch, faEraser, faCheckCircle, faTimesCircle, faEdit, faCheck,
        faMinusCircle, faClipboardList, faSitemap, faChevronUp, faChevronDown, faUserTag,
        faUserLock, faUsersCog, faUserFriends, faUserTimes, faUserMinus, faUserPlus, faUserCheck, faDatabase,
        faUserEdit, faSave, faUndo, faFileImport, faChevronRight, faExclamationCircle, faExclamationTriangle, faSync,
        faFolderPlus, faCogs, faTag, faIndustry, faBriefcase, faPlusCircle, faSquare, faCheckSquare, faInfoCircle,
        faTimes, faCheck, faDownload, faUpload, faClone, faEllipsisH, faStepForward, faBarcode, faHashtag, faBan,
        faClock, faCalendarCheck, faAlignJustify, faHandPaper, faCopy, faCommentDots, faPencilAlt, faFolder, faTh,
        faBookOpen, faLink, faList, faThumbsUp, faCog, faFile, faWrench, faPhone, faGlobe, faEye);
};

export {
    addFontAwesomeIconsToLibrary
}
