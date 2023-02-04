import React, {Component} from "react"
import * as d3 from "d3"
import final from "./final.csv"
import "./datavis.css"


class finalChart extends Component{
    componentDidMount(){
        this.drawChart();
    }


    drawChart(){
        const margin = { top: 30, right: 200, bottom: 60, left: 200 };
        const width = document.body.clientWidth;
        const height = 500;
    
        const xRange = [margin.left, width - margin.right];
        const yRange = [margin.top, height - margin.bottom*1.04];
    
        const xScale = d3.scaleTime().range(xRange);
        const yScale = d3.scaleLinear().range(yRange);
    
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        const svg = d3.select(".medium-time")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height]);

        svg.append('g').attr('class','xaxis').attr("transform", `translate(0, ${height - margin.bottom})`)

        svg.append('g').attr("class", "yaxis").attr("transform", `translate(${margin.left},0)`)
            
        const soldDots = svg.append('g');
        
        d3.csv(final).then((d)=>{
            var dates = []
            d.forEach((x)=>{
                if(x){
                    dates.push(new Date(x.Date))
                }
            })
            xScale.domain(d3.extent(dates));
            yScale.domain([581,0])

            soldDots
            .selectAll('circle')
            .data(d)
            .enter()
            .append('circle')
            .attr('cx',(x) => {
                if(xScale(new Date(x.Date))=== undefined){
                    return -50000000;
                }
                else{
                    return xScale(new Date(x.Date));
                    }
                })
            .attr('cy', (y) => yScale(y.count))
            .attr('r',5)
            .style('fill',(x) =>{
                if(x.medium == 'Oil on canvas'){
                    return '#FC4A9D'
                }
                else if(x.medium == "Others"){
                    return '#00FFFF'
                }
                else if(x.medium == "Work on paper"){
                    return '#f08e82'
                }
                else if(x.medium == "Mixed Media"){
                    return '#FF6600'
                }
                else{
                    return '#D8F793'
                }
            })
            .on("mouseover",(d) =>{
                d3.selectAll('#mouseOverText').remove();
                console.log(d)
                svg.append('text')
                .attr("font-size", 12)
                .attr("fill", "white")
                .attr("font-weight", 400)
                .attr("id", "mouseOverText")
                .attr("text-anchor", "front")
                .attr("x", d.offsetX + 30)
                .attr("y", d.offsetY)
                .text("Medium: "+ d.target.__data__.medium)
                .append('tspan')
                .attr("font-size", 12)
                .attr("fill", "white")
                .attr("font-weight", 400)
                .attr("id", "mouseOverText")
                .attr("text-anchor", "front")
                .attr("x", d.offsetX+30)
                .attr("y", d.offsetY - 20)
                .text('Date sold: ' + d.target.__data__.Date)
                .append('tspan')
                .attr("font-size", 12)
                .attr("fill", "white")
                .attr("font-weight", 400)
                .attr("id", "mouseOverText")
                .attr("text-anchor", "front")
                .attr("x", d.offsetX+30)
                .attr("y", d.offsetY + 20)
                .text('Number sold: ' + d.target.__data__.count)
            })
            
            svg
            .append("text")
            .attr("font-size", 14)
            .attr("fill", "white")
            .attr("font-weight", 550)
            .attr("fill-opacity", 1)
            .attr("text-anchor", "front")
            .attr("x", width / 2)
            .attr("y", height-20)
            .text("Year");

            svg
            .append("text")
            .attr("font-size", 14)
            .attr("fill", "white")
            .attr("font-weight", 550)
            .attr("fill-opacity", 1)
            .attr("text-anchor", "front")
            .attr("id", "axisLabel")
            .attr("x", 0)
            .attr("y", height /2 )
            .attr(
            "transform",
            `translate(${-110},${height / 1.4}) rotate(-90)`
            )
            .text("Number of pieces sold by Medium");

            svg.select('.xaxis').call(xAxis);
            svg.select('.yaxis').call(yAxis);
        })
    }

    render() {
        return (
            <div className = "vis">
                <svg className = "medium-time"></svg>
            </div>
        )
    }
}

export default finalChart