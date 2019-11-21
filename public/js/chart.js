const ctx = document.querySelector('.myChart').getContext('2d');

let arr = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let getVal = (function() {
    return axios
      .get("http://localhost:5100/login/sort")
      .then(res => result = res.data)
      .then(result => result = result[0].time)
      .then(result => result.sort((resultA, resultB) => resultA.dateId - resultB.dateId))
    //   .then(res => console.log(res))
      .then(res => {
          res.forEach(item => arr[item.dateId-1] = item.dateTime)
          console.log(arr);


          var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'bar',
        
            // The data for our dataset
            data: {
                labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
                datasets: [{
                    label: 'My First dataset',
                    backgroundColor: 'rgb(255, 255, 255)',
                    borderColor: 'rgb(255, 255, 255)',
                    data: arr
                }]
            },
        
            // Configuration options go here
            options:
            {
                legend: {display: false},
                scales: {
                    yAxes: [{
                        id: 'first-y-axis',
                        type: 'linear'
                    }, {
                        id: 'second-y-axis',
                        type: 'linear'
                    }]
                },
                scales: {
                    xAxes: [{
                        ticks:{
                            fontColor : 'rgba(255, 255, 255, 1)',
                            fontSize : 14
                        },
                        gridLines:{
                            color: "rgba(255, 255, 255, .4)",
                            lineWidth: 1
                        }
                    }],
                    yAxes: [{
                        ticks:{
                            fontColor : 'rgba(255, 255, 255, 1)',
                            fontSize : 14
                        },
                        gridLines:{
                            color: "rgba(255, 255, 255, .4)",
                            lineWidth: 1
                        }
                    }]
                }
        
            }
        });

        for(let i = 0; i <= 31; i++) {
            $eachTree = document.querySelector(`li:nth-child(${i+1}) img`);

            if(arr[i] !== 0){
                $eachTree.src = "img/tree.png";
            }
        }







      })
    //   .then(result => result.forEach(item => arr.push(item.dateTime)))
    //   .then(console.log(arr))
    //   .then(result => result.forEach(item => console.log(typeof item.dateId, item.dateId,typeof item.dateTime, item.dateTime)))
    //   .then(result => result.forEach(item => item = ))
}());




// var chart = new Chart(ctx, {
//     // The type of chart we want to create
//     type: 'bar',

//     // The data for our dataset
//     data: {
//         labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
//         datasets: [{
//             label: 'My First dataset',
//             backgroundColor: 'rgb(255, 255, 255)',
//             borderColor: 'rgb(255, 255, 255)',
//             data: arr
//         }]
//     },

//     // Configuration options go here
//     options:
//     {
//         legend: {display: false},
//         scales: {
//             yAxes: [{
//                 id: 'first-y-axis',
//                 type: 'linear'
//             }, {
//                 id: 'second-y-axis',
//                 type: 'linear'
//             }]
//         },
//         scales: {
//             xAxes: [{
//                 ticks:{
//                     fontColor : 'rgba(255, 255, 255, 1)',
//                     fontSize : 14
//                 },
//                 gridLines:{
//                     color: "rgba(255, 255, 255, .4)",
//                     lineWidth: 1
//                 }
//             }],
//             yAxes: [{
//                 ticks:{
//                     fontColor : 'rgba(255, 255, 255, 1)',
//                     fontSize : 14
//                 },
//                 gridLines:{
//                     color: "rgba(255, 255, 255, .4)",
//                     lineWidth: 1
//                 }
//             }]
//         }

//     }
// });
