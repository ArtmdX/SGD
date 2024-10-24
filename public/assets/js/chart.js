const graficoServicos = document.getElementById("grafico-pie"); //captura do elemento html, em uma variavel js, no caso o elemento grafico-pie esta entrando no js como graficoServiços
const graficoGastos = document.getElementById("grafico-bar"); //captura do elemento html, em uma variavel js, no caso o elemento grafico-bar esta entrando no js como graficoGastos


new Chart(graficoServicos, {
  //configs do grafico
  type: "pie",
  data: {
    labels: ["Em andamento", "Cancelado", "Concluido"],
    datasets: [
      {
        label: "Quantidade",
        data: [13, 4, 8],
        backgroundColor: ["#0e7eb3", "#f01c00", "#0c9400"],
        hoverOffset: 8,
      },
    ],
  },
});

new Chart(graficoGastos, {
  //configs do grafico
  type: "bar",
  data: {
    labels: ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez",],
    datasets: [
      {
        label: "Faturamento",
        data: [20,15,18,18,8,11,12,14,13,11,18,20],
        backgroundColor: "#0e7eb3"
      },
      {
        label:"Custos",
        data: [9,2,3,5,14,11,4,7,5,8,11,4],
        backgroundColor: "#f01c00"
      },
      {
        label:"Lucro",
        data: [11,13,15,13,0,0,8,7,8,3,7,16],
        backgroundColor: "#0c9400"
      },
    ],
  },
});

