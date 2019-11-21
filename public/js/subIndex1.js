const ctx = document.querySelector('.myChart').getContext('2d');

let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let getVal = (function () {
    return axios
        .get("http://localhost:5100/login")
        .then(res => result = res.data)
        .then(result => result = result[0].time)
        .then(result => result.sort((resultA, resultB) => resultA.dateId - resultB.dateId)) 
        .then(res => {
            res.forEach(item => arr[item.dateId - 1] = item.dateTime)
            var chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
                    datasets: [{
                        label: 'My First dataset',
                        backgroundColor: 'rgb(255, 255, 255)',
                        borderColor: 'rgb(255, 255, 255)',
                        data: arr
                    }]
                },
                options: {
                    legend: {
                        display: false
                    },
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
                            ticks: {
                                fontColor: 'rgba(255, 255, 255, 1)',
                                fontSize: 14
                            },
                            gridLines: {
                                color: "rgba(255, 255, 255, .4)",
                                lineWidth: 1
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                fontColor: 'rgba(255, 255, 255, 1)',
                                fontSize: 14
                            },
                            gridLines: {
                                color: "rgba(255, 255, 255, .4)",
                                lineWidth: 1
                            }
                        }]
                    }

                }
            });
            for (let i = 1; i <= 31; i++) {
                $eachTree = document.querySelector(`li:nth-child(${i}) img`);
                console.log($eachTree);
                if (arr[i-1] !== 0) {
                    $eachTree.src = "./img/tree.png";
                }
            }
        })
}());