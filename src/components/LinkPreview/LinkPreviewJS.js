/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
'use strict';
import react_1 from 'react';
require('./linkPreview.scss');
import Skeleton_1 from './Skeleton';
var proxyLink = 'https://ecclesia-webscraper.herokuapp.com/?url=';
function isValidResponse(res) {
	return (
		res.title !== undefined &&
		res.description !== undefined &&
		res.image !== undefined &&
		res.siteName !== undefined &&
		res.hostname !== undefined
	);
}
export default function LinkPreview({ _a }) {
	var url = _a.url,
		_b = _a.className,
		className = _b === void 0 ? '' : _b,
		width = _a.width,
		height = _a.height,
		descriptionLength = _a.descriptionLength,
		borderRadius = _a.borderRadius,
		imageHeight = _a.imageHeight,
		textAlign = _a.textAlign,
		margin = _a.margin,
		_c = _a.fallback,
		fallback = _c === void 0 ? null : _c,
		_d = _a.backgroundColor,
		backgroundColor = _d === void 0 ? 'white' : _d,
		_e = _a.primaryTextColor,
		primaryTextColor = _e === void 0 ? 'black' : _e,
		_f = _a.secondaryTextColor,
		secondaryTextColor = _f === void 0 ? 'rgb(100, 100, 100)' : _f,
		_g = _a.borderColor,
		borderColor = _g === void 0 ? '#ccc' : _g,
		_h = _a.showLoader,
		showLoader = _h === void 0 ? true : _h,
		_j = _a.customLoader,
		customLoader = _j === void 0 ? null : _j,
		_k = _a.openInNewTab,
		openInNewTab = _k === void 0 ? true : _k,
		fetcher = _a.fetcher;
	var _isMounted = react_1.useRef(true);
	var _l = react_1.useState(),
		metadata = _l[0],
		setMetadata = _l[1];
	var _m = react_1.useState(true),
		loading = _m[0],
		setLoading = _m[1];
	react_1.useEffect(
		function () {
			_isMounted.current = true;
			setLoading(true);
			if (fetcher) {
				fetcher(url)
					.then(function (res) {
						if (_isMounted.current) {
							if (isValidResponse(res)) {
								setMetadata(res);
							} else {
								setMetadata(null);
							}
							setLoading(false);
						}
					})
					['catch'](function (err) {
						console.error(err);
						console.error('No metadata could be found for the given URL.');
						if (_isMounted.current) {
							setMetadata(null);
							setLoading(false);
						}
					});
			} else {
				fetch(proxyLink + url)
					.then(function (res) {
						return res.json();
					})
					.then(function (res) {
						if (_isMounted.current) {
							setMetadata(res.metadata);
							setLoading(false);
						}
					})
					['catch'](function (err) {
						console.error(err);
						console.error('No metadata could be found for the given URL.');
						if (_isMounted.current) {
							setMetadata(null);
							setLoading(false);
						}
					});
			}
			return function () {
				_isMounted.current = false;
			};
		},
		[url, fetcher]
	);
	if (loading && showLoader) {
		if (customLoader) {
			return react_1['default'].createElement(react_1['default'].Fragment, null, customLoader);
		} else {
			return react_1['default'].createElement(Skeleton_1['default'], {
				width: width,
				imageHeight: imageHeight,
				margin: margin,
			});
		}
	}
	if (!metadata) {
		return react_1['default'].createElement(react_1['default'].Fragment, null, fallback);
	}
	var image = metadata.image,
		description = metadata.description,
		title = metadata.title,
		siteName = metadata.siteName,
		hostname = metadata.hostname;
	var onClick = function () {
		var browserTarget = openInNewTab ? '_blank' : '_self';
		window.open(url, browserTarget);
	};
	return react_1['default'].createElement(
		'div',
		{
			'data-testid': 'container',
			onClick: onClick,
			className: 'Container ' + className,
			style: {
				width: width,
				height: height,
				borderRadius: borderRadius,
				textAlign: textAlign,
				margin: margin,
				backgroundColor: backgroundColor,
				borderColor: borderColor,
			},
		},
		react_1['default'].createElement('div', {
			'data-testid': 'image-container',
			style: {
				borderTopLeftRadius: borderRadius,
				borderTopRightRadius: borderRadius,
				backgroundImage: 'url(' + image + ')',
				height: imageHeight,
			},
			className: 'Image',
		}),
		react_1['default'].createElement(
			'div',
			{ className: 'LowerContainer' },
			react_1['default'].createElement(
				'h3',
				{ 'data-testid': 'title', className: 'Title', style: { color: primaryTextColor } },
				title
			),
			description &&
				react_1['default'].createElement(
					'span',
					{ 'data-testid': 'desc', className: 'Description Secondary', style: { color: secondaryTextColor } },
					descriptionLength
						? description.length > descriptionLength
							? description.slice(0, descriptionLength) + '...'
							: description
						: description
				),
			react_1['default'].createElement(
				'div',
				{ className: 'Secondary SiteDetails', style: { color: secondaryTextColor } },
				siteName && react_1['default'].createElement('span', null, siteName, ' \u2022 '),
				react_1['default'].createElement('span', null, hostname)
			)
		)
	);
}
