import { h } from 'preact';

const IconArrowDown = ({ id, className }) => (
	<svg id={id} className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
		aria-labelledby="title"
	>
		<title id="title">Icon Arrow</title>
		<path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
	</svg>
);

export { IconArrowDown };