import React, {Component} from "react"
import * as d3 from "d3"
import datasource1 from "./datasource1.csv?url"
import firstgraphic from "./firstgraphic.csv?url"
import datasource from "./datasource.csv?url"
import "./datavis.css"


class dotChart extends Component{
    componentDidMount(){
        this.drawChart();
    }

    drawChart(){
        const margin = { top: 30, right: 200, bottom: 60, left: 200 };
        const width = document.body.clientWidth;
        const height = 500;
    
        const xRange = [margin.left, width - margin.right];
        const yRange = [margin.top, height - margin.bottom*1.04];
    
        // Construct scales and axes.
        const xScale = d3.scaleTime().range(xRange);
        const yScale = d3.scaleLinear().range(yRange);
    
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        const svg = d3.select(".price-time")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height]);

            svg.append('g').attr('class','xaxis').attr("transform", `translate(0, ${height - margin.bottom})`)

            svg.append('g').attr("class", "yaxis").attr("transform", `translate(${margin.left},0)`)
            
            const dots = svg.append('g');
        d3.selectAll('#firstCircles').remove();
        d3.csv(datasource1).then((d) => {
            var domain = [];
            var yDomain = []
            d.forEach((x)=>{
                if(x){
                    domain.push(new Date(x.date_sold))
                    yDomain.push(x.Price)
                }
            })
            xScale.domain(d3.extent(domain));
            yScale.domain([yDomain[yDomain.length -1]/4,0])


            dots
            .selectAll('circle')
            .data(d)
            .enter()
            .append('circle')
            .attr('id','firstCircles')
            .attr('cx',(x) =>{
                if(xScale(new Date(x.date_sold))=== undefined){
                    return -50000000;
                }
                else{
                    return xScale(new Date(x.date_sold))
                }})
            .attr('cy', (y) => yScale(y.Price))
            .attr('r',2)
            .style('fill','#4099E8')
            
            svg
            .append("text")
            .attr("font-size", 14)
            .attr("fill", "white")
            .attr("font-weight", 550)
            .attr("text-anchor", "front")
            .attr("x", width/2)
            .attr("y", 480)
            .text('Year');

            svg
            .append("text")
            .attr("font-size", 14)
            .attr("fill", "white")
            .attr("font-weight", 550)
            .attr("fill-opacity", 1)
            .attr("text-anchor", "front")
            .attr("id", "axisLabel")
            .attr("x", 0)
            .attr("y", 200)
            .attr(
                "transform",
                `translate(${-90},${height / 1.5}) rotate(-90)`
            )
            .text("Price artwork sold for (USD) ");


            svg.select('.xaxis').call(xAxis);
            svg.select('.yaxis').call(yAxis);
        })
    };

    render() {
        return (
            <div className = "vis">
                <svg className = "price-time"></svg>
            </div>
        )
    }
}

export default dotChart