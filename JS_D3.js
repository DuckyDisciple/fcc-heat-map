var url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json";

var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

var margin = {top:10,right:10,bottom:40,left:40};
var w = 800-margin.left-margin.right;
var h = 450-margin.top-margin.bottom;

var xScale = d3.scale.linear().range([0,w]);
var xVal = function(d){ return d.year;};
var xMap = function(d){ return xScale(d.year);};
var xAxis = d3.svg.axis().scale(xScale)
  .orient("bottom")
  .tickFormat(d3.format("d"));

var yScale = d3.scale.linear().range([h,0]);
var yVal = function(d){ return d.month;};
var yMap = function(d){ return yScale(d.month+0.6);};
var yAxis = d3.svg.axis().scale(yScale)
  .orient("left");

$(document).ready(function(){
  $.get(url, function(result){
    var data = JSON.parse(result);
    var dataset = data.monthlyVariance;
    var temp = data.baseTemperature;
    
    xScale.domain([d3.min(dataset,xVal)-1, d3.max(dataset,xVal)]);
    yScale.domain([d3.min(dataset,yVal)-.5, d3.max(dataset,yVal)+.5]);
    
    var variance = function(d){
      return d.variance
    ;};
    
    var color = d3.scale.linear()
      .range(["blue","white","red"])
      .domain([d3.min(dataset,variance),
               d3.mean(dataset,variance),
               d3.max(dataset,variance)]);
    
    function getColor(d){
      return color(d.variance);
    }
    
    var svg = d3.select("body")
      .append("svg")
      .attr("width",w+margin.left+margin.right)
      .attr("height",h+margin.top+margin.bottom)
     .append("g")
      .attr("transform","translate(" + margin.left+"," + margin.top+")");
    
    svg.append("g")
      .attr("class","x axis")
      .attr("transform","translate(0,"+h+")")
      .call(xAxis)
     .append("text")
      .attr("class", "label")
      .attr("x", w/2)
      .attr("y", 40)
      .text("Year")
      .style("text-anchor","middle");
    
    svg.append("g")
      .attr("class","y axis")
      .call(yAxis)
     .append("text")
      .text("Month")
      .attr("class","label")
      .attr("transform","rotate(90)")
      .attr("x",h/2)
      .attr("y",40)
      .style("text-anchor","middle");
    
    var temps = svg.selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("class","temp")
      .attr("width",function(){return w/(dataset.length/12)})
      .attr("height",function(){return h/12})
      .attr("x",xMap)
      .attr("y",yMap)
      .style("fill",getColor)
      .on("mouseover",function(d){
        tooltip.classed("hide",false)
          .style("left",d3.event.pageX+"px")
          .style("top",d3.event.pageY+"px")
          .text(months[d.month-1]+" - "+d.year+"\nTemp (C): "+(temp+d.variance).toPrecision(3));
        d3.select(this).style("fill","orange");
      })
      .on("mouseout",function(){
        tooltip.classed("hide",true);
        d3.select(this).style("fill",getColor);
      });
    
    
  });
});

var tooltip = d3.select("body")
  .append("div")
  .attr("class","tip hide");
