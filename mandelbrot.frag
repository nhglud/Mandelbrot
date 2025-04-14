
#ifdef GL_ES
precision highp float;
#endif

varying vec2 pos;

uniform float minx;
uniform float maxx;
uniform float miny;
uniform float maxy;

const float MAX_ITERATIONS = 1000.0;

float iterateMandelbrot(vec2 coord) {
    float x = 0.;
    float y = 0.;

    for(float i = 0.; i < MAX_ITERATIONS; i++) {
        if(x * x + y * y > 4.0) return i / MAX_ITERATIONS;
        
        float xtmp = x * x - y * y + coord.x;
        y = 2.0 * x * y + coord.y;
        x = xtmp;
    }
    
    return 1.0;
}

void main() {
    float x = ((maxx - minx) * pos.x) + minx;
    float y = ((maxy - miny) * pos.y) + miny;

    float i = iterateMandelbrot(vec2(x, y));

    gl_FragColor = vec4(i, i, i, 1.);
}

