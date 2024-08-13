const graficoServicos = document.getElementById("grafico-pie");  //captura do elemento html, em uma variavel js, no caso o elemento grafico-pie esta entrando no js como graficoServiços
const graficoGastos = document.getElementById("grafico-bar")     //captura do elemento html, em uma variavel js, no caso o elemento grafico-bar esta entrando no js como graficoGastos



new Chart(graficoServicos, {  //configs do grafico
  type: "pie",
  data: {
    labels: ["Em andamento", "Cancelado", "Concluido"],
    datasets: [
      {
        label: "Quantidade",
        data: [12, 19, 3],
        backgroundColor: [
            "#0e7eb3",
            "#f01c00",
            "#0c9400",
        ],
        hoverOffset: 8
      },
    ],
  },
});


new Chart(graficoGastos, {  //configs do grafico
    type: "bar",
    data: {
      labels: ["Faturamento", "Custos", "Lucro"],
      datasets: [
        {
          label: [""],
          data: [20, 15, 5],
          backgroundColor: [
            "#0e7eb3",
            "#f01c00",        
            "#0c9400",
          ],
        },
      ],
    },
  });


