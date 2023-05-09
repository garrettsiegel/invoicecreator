class App {
	constructor() {
		this.makeEditable();
		this.changeLogoAndQrcode();
		this.generatePDF();
		this.colors();
	}

	makeEditable = () => {
		const editableElements = document.querySelectorAll('.editable');
		editableElements.forEach(function(element) {
			element.setAttribute('contenteditable', 'true');
		});
	}

	changeLogoAndQrcode = () => {
		document.getElementById('logo').addEventListener('change', function() {
			const reader = new FileReader();
			reader.onload = function(e) {
					document.querySelector('.invoice-logo').src = e.target.result;
			};
			reader.readAsDataURL(this.files[0]);
		});
		document.getElementById('qrcode').addEventListener('change', function() {
			const reader = new FileReader();
			reader.onload = function(e) {
					document.querySelector('.qrcode').src = e.target.result;
			};
			reader.readAsDataURL(this.files[0]);
		});
	}

	generatePDF = () => {
		document.getElementById('generate-pdf').addEventListener('click', function () {
			const invoice = document.getElementById('page');
		
			html2canvas(invoice, {
				scale: 5,
				onclone: (clonedDoc) => {
					const svgElements = clonedDoc.querySelectorAll("svg");
		
					Array.from(svgElements).forEach((svg) => {
						const img = document.createElement("img");
						img.src = "data:image/svg+xml," + encodeURIComponent(svg.outerHTML);
						svg.parentNode.replaceChild(img, svg);
					});
				},
			}).then((canvas) => {
				const imgData = canvas.toDataURL("image/png");
		
				const docDefinition = {
					content: [
						{
							image: imgData,
							width: 612,
							alignment: "center",
						},
					],
					pageMargins: [0, 0, 0, 0],
				};
		
				pdfMake.createPdf(docDefinition).download("invoice.pdf");
			});
		});
	}

	colors = () => {
		document.addEventListener('DOMContentLoaded', () => {
			const [bgColorInput, secondaryColorInput] = ['primary-color', 'secondary-color'].map(id => document.getElementById(id));
			bgColorInput.value = '#0b9aab';
			secondaryColorInput.value = '#ffe70020';
	
			const updateColors = () => {
					const [primaryColor, secondaryColor] = [bgColorInput.value, secondaryColorInput.value];
					const colorSets = [
							['--selected-color-primary', '.sel-color-bg', primaryColor, true],
							['--selected-color-secondary', '.secondary-color', secondaryColor],
							['--selected-color-primary-opaque', '.opaque', primaryColor + '50'],
					];
	
					colorSets.forEach(([prop, selector, color, isTextWhite]) => {
							document.documentElement.style.setProperty(prop, color);
							document.querySelectorAll(selector).forEach(el => {
									el.style.backgroundColor = color;
									if (isTextWhite) el.style.color = '#ffffff';
							});
					});
	
					const secondaryStyle = document.querySelector('#secondary-color-style') || document.head.appendChild(Object.assign(document.createElement('style'), { id: 'secondary-color-style' }));
					secondaryStyle.innerHTML = `.table-cell { background-image: linear-gradient(to left, ${secondaryColor}, white); }`;
	
					document.querySelectorAll('.sel-color').forEach(el => el.style.color = primaryColor);
			};
	
			[bgColorInput, secondaryColorInput].forEach(input => input.addEventListener('input', updateColors));
	
			document.getElementById('primary-color').addEventListener('input', function() {
					const selectedColor = this.value;
					document.querySelectorAll('.sel-color-border').forEach(el => el.style.borderColor = selectedColor);
			});
	
			updateColors();
		});
	
	}
}

const app = new App();