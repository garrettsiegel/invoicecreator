class generatePDF {
  constructor() {
    this.generatePDF()
  }

  generatePDF = () => {
		document.getElementById('generate-pdf').addEventListener('click', function () {
			const invoice = document.getElementById('page1');
			const invoicePG2 = document.getElementById('page2');
			
			const createCanvasFromElement = (element) => {
				return html2canvas(element, {
					scale: 5,
          
					onclone: (clonedDoc) => {
            

						const svgElements = clonedDoc.querySelectorAll("svg");

            // show all images not just svg's
            
			
						Array.from(svgElements).forEach((svg) => {
							const img = document.createElement("img");
							img.src = "data:image/svg+xml," + encodeURIComponent(svg.outerHTML);
							svg.parentNode.replaceChild(img, svg);
						});
					},
				});
			};
			
			Promise.all([createCanvasFromElement(invoice), createCanvasFromElement(invoicePG2)])
				.then(([canvas1, canvas2]) => {
					const imgData1 = canvas1.toDataURL("image/png");
					const imgData2 = canvas2.toDataURL("image/png");
				
					const docDefinition = {
						content: [
							{
								image: imgData1,
								width: 612,
								alignment: "center",
							},
							{
								image: imgData2,
								width: 612,
								alignment: "center",
							}
						],
						pageMargins: [0, 0, 0, 0],
					};
				
					const filenameInput = document.getElementById('filename-input');
					let filename = filenameInput.value.trim();
					if(filename === ''){
						filename = 'invoice.pdf';
					} else {
						filename = filename.replace(/[^a-z0-9]/gi, '_').toLowerCase(); // sanitize filename
						filename += '.pdf';
					}
	
					pdfMake.createPdf(docDefinition).download(filename);
          console.log('working')

				});
		});
	}
 
}

export default generatePDF
