import './slicedToArray-4e274c67.js';
import './unsupportedIterableToArray-137e449b.js';
import React from 'react';
import './_commonjsHelpers-97e6d7b1.js';
import './index-097535f1.js';
import './defineProperty-a0480c32.js';
import './toConsumableArray-127424c2.js';
import _styled from 'styled-components';
import './getPrototypeOf-b96da1e1.js';
import './color.js';
import './components.js';
import './contains-component.js';
import './css.js';
import './dayjs.min-e57fb69a.js';
import './date.js';
import './miscellaneous.js';
import './environment.js';
import './font.js';
import './math-e6d0e93a.js';
import './characters.js';
import './format.js';
import './keycodes.js';
import './url.js';
import { blockExplorerUrl } from './web3.js';
import './constants.js';
import './breakpoints.js';
import './springs.js';
import './text-styles.js';
import './theme-dark.js';
import './theme-light.js';
import './Theme.js';
import { _ as _extends } from './extends-db4f0c26.js';
import { _ as _objectWithoutProperties } from './objectWithoutProperties-234758e1.js';
import './index-422d37c0.js';
import './isObject-3c6ec07e.js';
import './Viewport-cc7debfb.js';
import './Layout.js';
import './FocusVisible.js';
import './ButtonBase.js';
import './IconPropTypes-aab7337d.js';
import './IconAddUser.js';
import './IconAlert.js';
import './IconAlignCenter.js';
import './IconAlignJustify.js';
import './IconAlignLeft.js';
import './IconAlignRight.js';
import './IconAragon.js';
import './IconArrowDown.js';
import './IconArrowLeft.js';
import './IconArrowRight.js';
import './IconArrowUp.js';
import './IconAtSign.js';
import './IconBlock.js';
import './IconBookmark.js';
import './IconCalendar.js';
import './IconCanvas.js';
import './IconCaution.js';
import './IconCenter.js';
import './IconChart.js';
import './IconChat.js';
import './IconCheck.js';
import './IconChip.js';
import './IconCircleCheck.js';
import './IconCircleMinus.js';
import './IconCirclePlus.js';
import './IconClock.js';
import './IconCloudDownload.js';
import './IconCloudUpload.js';
import './IconCoin.js';
import './IconConfiguration.js';
import './IconConnect.js';
import './IconConnection.js';
import './IconConsole.js';
import './IconCopy.js';
import './IconCross.js';
import './IconDashedSquare.js';
import './IconDown.js';
import './IconDownload.js';
import './IconEdit.js';
import './IconEllipsis.js';
import './IconEnter.js';
import './IconEthereum.js';
import './IconExternal.js';
import './IconFile.js';
import './IconFilter.js';
import './IconFlag.js';
import './IconFolder.js';
import './IconGraph2.js';
import './IconGraph.js';
import './IconGrid.js';
import './IconGroup.js';
import './IconHash.js';
import './IconHeart.js';
import './IconHide.js';
import './IconHome.js';
import './IconImage.js';
import './IconInfo.js';
import './IconLabel.js';
import './IconLayers.js';
import './IconLeft.js';
import './IconLink.js';
import './IconLocation.js';
import './IconLock.js';
import './IconMail.js';
import './IconMaximize.js';
import './IconMenu.js';
import './IconMinimize.js';
import './IconMinus.js';
import './IconMove.js';
import './IconNoPicture.js';
import './IconPicture.js';
import './IconPlus.js';
import './IconPower.js';
import './IconPrint.js';
import './IconProhibited.js';
import './IconQuestion.js';
import './IconRefresh.js';
import './IconRemoveUser.js';
import './IconRight.js';
import './IconRotateLeft.js';
import './IconRotateRight.js';
import './IconSearch.js';
import './IconSettings.js';
import './IconShare.js';
import './IconSquareMinus.js';
import './IconSquarePlus.js';
import './IconSquare.js';
import './IconStarFilled.js';
import './IconStar.js';
import './IconSwap.js';
import './IconTarget.js';
import './IconToken.js';
import './IconTrash.js';
import './IconUnlock.js';
import './IconUp.js';
import './IconUpload.js';
import './IconUser.js';
import './IconView.js';
import './IconVote.js';
import './IconWallet.js';
import './IconWarning.js';
import './IconWorld.js';
import './IconWrite.js';
import './IconZoomIn.js';
import './IconZoomOut.js';
import './objectWithoutPropertiesLoose-9606ad13.js';
import 'react-dom';
import './web-a351a0a1.js';
import './Button.js';
import './ButtonIcon.js';
import './getDisplayName-d5fc7707.js';
import './index-edfeada6.js';
import Link from './Link.js';
import './TextInput.js';
import './ToastHub.js';
import './index-f754c2df.js';
import './RootPortal.js';
import './TextCopy.js';
import './taggedTemplateLiteral-37fd5203.js';
import './_react_commonjs-external-3b63cae6.js';
import './EthIdenticon.js';
import AddressField from './AddressField.js';
import './useArrowKeysFocus.js';
import './useClickOutside.js';
import './useFocusEnter.js';
import './useFocusLeave.js';
import { ImageExists } from './useImageExists.js';
import './useKeyDown.js';
import './useOnBlur.js';
import BadgePopoverActionType from './BadgePopoverActionType.js';
import { P as PropTypes } from './proptypes-c8a77d05.js';
import './Popover.js';
import './observe.js';
import './index-f0d64c59.js';
import './providers.js';
import BadgePopoverBase from './BadgePopoverBase.js';

var AppBadgePopover = React.memo(function AppBadgePopover(_ref) {
  var appAddress = _ref.appAddress,
      iconFallbackSrc = _ref.iconFallbackSrc,
      iconSrc = _ref.iconSrc,
      networkType = _ref.networkType,
      onClose = _ref.onClose,
      opener = _ref.opener,
      popoverAction = _ref.popoverAction,
      title = _ref.title,
      visible = _ref.visible;
  var etherscanUrl = blockExplorerUrl('address', appAddress, {
    networkType: networkType
  });
  return /*#__PURE__*/React.createElement(BadgePopoverBase, {
    addressField: /*#__PURE__*/React.createElement(ImageExists, {
      src: iconSrc
    }, function (_ref2) {
      var exists = _ref2.exists,
          displayFallback = _ref2.displayFallback;
      return /*#__PURE__*/React.createElement(AddressField, {
        address: appAddress,
        icon: /*#__PURE__*/React.createElement(Icon, {
          src: exists ? iconSrc : iconFallbackSrc
        })
      });
    }),
    link: etherscanUrl && /*#__PURE__*/React.createElement(Link, {
      href: etherscanUrl
    }, "See on Etherscan"),
    onClose: onClose,
    opener: opener,
    popoverAction: popoverAction,
    title: title,
    visible: visible
  });
});
AppBadgePopover.propTypes = {
  appAddress: PropTypes.string.isRequired,
  iconFallbackSrc: PropTypes.string,
  iconSrc: PropTypes.string,
  networkType: PropTypes.string,
  onClose: PropTypes.func,
  opener: PropTypes._element,
  popoverAction: BadgePopoverActionType,
  title: PropTypes.node.isRequired,
  visible: PropTypes.bool
};

var _StyledDiv = _styled("div").withConfig({
  displayName: "AppBadgePopover___StyledDiv",
  componentId: "cornse-0"
})(["width:100%;height:100%;background-size:contain;background-position:50% 50%;background-repeat:no-repeat;background-image:url(", ");"], function (p) {
  return p._css;
});

function Icon(_ref3) {
  var src = _ref3.src,
      props = _objectWithoutProperties(_ref3, ["src"]);

  return /*#__PURE__*/React.createElement(_StyledDiv, _extends({}, props, {
    _css: src
  }));
}

Icon.propTypes = {
  src: PropTypes.string.isRequired
};

export default AppBadgePopover;
//# sourceMappingURL=AppBadgePopover.js.map
