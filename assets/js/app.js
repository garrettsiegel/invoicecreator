import { jsPDF } from "jspdf";

class App {
	constructor() {
		this.init();
	}

	init() {
		
		function makeEditable() {
			const editableElements = document.querySelectorAll('.editable');
		
			editableElements.forEach(function(element) {
				element.setAttribute('contenteditable', 'true');
			});
		}
		
		document.addEventListener('DOMContentLoaded', function() {
			makeEditable();
		});
		



		document.addEventListener('DOMContentLoaded', function() {
			const bgColorInput = document.getElementById('primary-color');
			const secondaryColorInput = document.getElementById('secondary-color');
		
			function updateColors() {
				const primaryColor = bgColorInput.value;
				const secondaryColor = secondaryColorInput.value;
		
				// Update primary color
				document.documentElement.style.setProperty('--selected-color-primary', primaryColor);
				const primaryColorElements = document.querySelectorAll('.sel-color-bg');
				primaryColorElements.forEach(function(element) {
					element.style.backgroundColor = primaryColor;
					element.style.color = '#ffffff'; // Set text color to white
				});
		
				// Update secondary color
				document.documentElement.style.setProperty('--selected-color-secondary', secondaryColor);
				const secondaryColorElements = document.querySelectorAll('.secondary-color');
				secondaryColorElements.forEach(function(element) {
					element.style.backgroundColor = secondaryColor;
				});
		
				const secondaryColorStyle = document.querySelector('#secondary-color-style');
				if (secondaryColorStyle) {
					secondaryColorStyle.innerHTML = `.table-cell { background-image: linear-gradient(to left, ${secondaryColor}, white); }`;
				} else {
					const newSecondaryColorStyle = document.createElement('style');
					newSecondaryColorStyle.id = 'secondary-color-style';
					newSecondaryColorStyle.innerHTML = `.table-cell { background-image: linear-gradient(to left, ${secondaryColor}, white); }`;
					document.head.appendChild(newSecondaryColorStyle);
				}
				
				const selColorElements = document.querySelectorAll('.sel-color');
				selColorElements.forEach(function(element) {
					element.style.color = primaryColor; // Set text color to primary color
				});
			}
		
			// Update colors on input change
			bgColorInput.addEventListener('input', updateColors);
			secondaryColorInput.addEventListener('input', updateColors);
		
			// Set initial colors
			bgColorInput.value = '#0b9aab';
			secondaryColorInput.value = '#ffe70020';
			updateColors();
		});
		
		
		document.getElementById('primary-color').addEventListener('input', function() {
			const selectedColor = this.value;
			const elements = document.querySelectorAll('.sel-color-border');
			elements.forEach(function(element) {
				element.style.borderColor = selectedColor;
			});
		});
		
		
		
	
		
		document.getElementById('logo').addEventListener('change', function() {
				const reader = new FileReader();
				reader.onload = function(e) {
						document.querySelector('.invoice-logo').src = e.target.result;
				};
				reader.readAsDataURL(this.files[0]);
		});

		document.addEventListener('DOMContentLoaded', function() {
			const barcodeValue = "DFTFTFAFTDTDDFATDFDADFDTATTFADFATFFFTTFFDDFFAFTDTTFDFTDADAFTFTTFT";
			const barcodeInput = document.getElementById('barcode');
			barcodeInput.value = barcodeValue;
			
			const barcodeElement = document.querySelector('.barcode');
			barcodeElement.textContent = barcodeValue;
		});
		
		document.getElementById('barcode').addEventListener('input', function() {
			const barcodeValue = this.value;
			const barcodeElement = document.querySelector('.barcode');
			barcodeElement.textContent = barcodeValue;
		});
		
		
		
		
		
		

		// document.getElementById('website').addEventListener('input', function() {
		// 	document.querySelector('.website').textContent = this.value;
		// });
		
		// document.getElementById('company-name').addEventListener('input', function() {
		// 		document.querySelector('.invoice-company-name').textContent = this.value;
		// });
		
		// document.getElementById('company-address').addEventListener('input', function() {
		// 		document.querySelector('.invoice-company-address').textContent = this.value;
		// });







		
	document.getElementById('generate-pdf').addEventListener('click', function () {
		const invoice = document.getElementById('page');
	
		// Convert the invoice element to an SVG
		html2canvas(invoice, {
			scale: 5,
			onclone: (clonedDoc) => {
				const svgElements = clonedDoc.querySelectorAll("svg");
	
				// Convert SVG elements to images
				Array.from(svgElements).forEach((svg) => {
					const img = document.createElement("img");
					img.src = "data:image/svg+xml," + encodeURIComponent(svg.outerHTML);
					svg.parentNode.replaceChild(img, svg);
				});
			},
		}).then((canvas) => {
			// Convert the canvas to a data URL
			const imgData = canvas.toDataURL("image/png");
	
			// Create the PDF
			const docDefinition = {
				content: [
					{
						image: imgData,
						width: 612,
						alignment: "center",
					},
				],
				pageMargins: [0, 0, 0, 0], // Set top margin to 0
			};
	
			pdfMake.createPdf(docDefinition).download("invoice.pdf");
		});
	});
	
	
	
	
	}

	

}

const app = new App();