function button() {

  var width = 960,
      height = 500,
      count = 0,
      container = null,
      text = null;

  var defs = null,
      cb = null,
      rect = null;

  var padding = 10,
      radius = 10,
      stdDeviation = 5,
      offsetX = 2,
      offsetY = 4;

  function my() {

    // set defaults
    var g = container || d3.select('svg').append('g')
        .attr('transform', 'translate(' + [width / 2, height / 2] + ")");

    text = text || g.append('text').text('Hello, world!');

    defs = g.append('defs');

    // use button text to define button dimensions
    var bbox = text.node().getBBox();
    rect = g.append('rect')
        .attr('class', 'button')
        .attr("x", bbox.x - padding)
        .attr("y", bbox.y - padding)
        .attr("width", bbox.width + 2 * padding)
        .attr("height", bbox.height + 2 * padding)
        .attr('rx', radius)
        .attr('ry', radius)

    addShadow(count);
    addGradient(count);

    rect.attr('fill', 'url(#gradient' + count + ')')
        .attr('filter', 'url(#shadow' + count + ')')
        .on('click', clicked)
        .on('mouseover', brighten)
        .on('mouseout', darken)

    // put text on top of the button
    g.append(function() { return text.remove().node(); })

    return my;
  }

  function addGradient(k) {
    var gradient = defs.append('linearGradient')
        .attr('id', 'gradient' + k)
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '0%')
        .attr('y2', '100%');

    gradient.append('stop')
        .attr('class', 'gradientStart')
        .attr('offset', '0%')

    gradient.append('stop')
        .attr('class', 'gradientStop')
        .attr('offset', '100%')
  }

  function brighten() {
    d3.select(this.parentNode).classed('active', true);
  }

  function darken() {
    d3.select(this.parentNode).classed('active', false);
  }

  function addShadow(k) {
    var shadow = defs.append('filter')
        .attr('id', 'shadow' + k)
        .attr('x', + rect.attr('x') - 5 * padding)
        .attr('y', + rect.attr('y') - 5 * padding)
        .attr('width', + rect.attr('width') + 10 * padding)
        .attr('height', + rect.attr('height') + 10 * padding)

    shadow.append('feGaussianBlur')
        .attr('in', 'SourceAlpha')
        .attr('stdDeviation', stdDeviation)

    defs.select('filter').append('feOffset')
        .attr('dx', offsetX)
        .attr('dy', offsetY)

    var merge = shadow.append('feMerge')

    merge.append('feMergeNode')
    merge.append('feMergeNode').attr('in', 'SourceGraphic');
  }

  function clicked() {
    if (typeof cb === 'function') return cb();
    press();
  }

  function toggleShadow() {
    var active = defs.select('feGaussianBlur')
        .attr('stdDeviation') == stdDeviation ? true : false;

    if (active) return release();
    press();
  }

  function release() {
    defs.select('feGaussianBlur').attr('stdDeviation', stdDeviation)
    defs.select('feOffset').attr('dx', offsetX).attr('dy', offsetY)
  }

  function press() {
    defs.select('feGaussianBlur').attr('stdDeviation', 0)
    defs.select('feOffset').attr('dx', 0).attr('dy', 0)
  }

  my.container = function(_) {
    if (!arguments.length) return container;
    container = _;
    return my;
  };

  my.text = function(_) {
    if (!arguments.length) return text;
    text = _;
    return my;
  };

  my.count = function(_) {
    if (!arguments.length) return count;
    count = _;
    return my;
  };

  my.cb = function(_) {
    if (!arguments.length) return cb;
    cb = _;
    return my;
  };

  my.clicked = clicked;
  my.toggleShadow = toggleShadow;
  my.press = press;
  my.release = release;

  return my;
}