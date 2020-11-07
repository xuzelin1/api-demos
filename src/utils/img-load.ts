const options = {
	root: document.querySelector('#viewport'),
	rootMargin: '0px',
	threshold: 1.0
};

const callback = function(entries: any[], observer: any) {
	entries.forEach((entry: any) => {
		console.log(entry);
		if (entry.intersectionRatio >= 0.3) {
			setTimeout(() => {
				entry.target.src = entry.target.dataset.src;
			})
		}
	});
}

const observer =  new IntersectionObserver(callback, options);

export default observer;
