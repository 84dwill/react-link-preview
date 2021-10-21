'use strict';
exports.__esModule = true;
import react_1 from 'react';
import react_loading_skeleton_1 from 'react-loading-skeleton';
require('./skeleton.scss');
var Skeleton = function (_a) {
	var _b = _a.width,
		width = _b === void 0 ? '100%' : _b,
		_c = _a.imageHeight,
		imageHeight = _c === void 0 ? '30vh' : _c,
		margin = _a.margin;
	return react_1['default'].createElement(
		'div',
		{ className: 'skeleton-container', style: { width: width, margin: margin } },
		react_1['default'].createElement(react_loading_skeleton_1['default'], { width: width, height: imageHeight }),
		react_1['default'].createElement(
			'div',
			{ className: 'skeleton-lower-container' },
			react_1['default'].createElement(react_loading_skeleton_1['default'], { count: 3 })
		)
	);
};
exports['default'] = Skeleton;
