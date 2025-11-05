# GlitterFinal - Technical Documentation

## Overview

The GlitterFinal component creates a realistic sparkling/glitter effect using WebGL shaders and Three.js. This is a GPU-accelerated effect that provides high performance and visual quality.

## Architecture

```
GlitterFinal Component
├── Three.js Canvas (WebGL Context)
│   ├── Camera (position: [0,0,8], fov: 35)
│   ├── Scene Background (#111111)
│   └── SparklesPlane
│       ├── PlaneGeometry (10x10)
│       └── ShaderMaterial
│           ├── Vertex Shader (UV passthrough)
│           ├── Fragment Shader (glitter effect)
│           └── Uniforms
│               ├── iTime (animation)
│               ├── iResolution (viewport size)
│               └── iChannel0 (noise texture)
```

## Shader Implementation

### Vertex Shader

```glsl
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
```

**Purpose**: Pass UV coordinates from vertex to fragment shader.

### Fragment Shader

```glsl
uniform float iTime;
uniform vec2 iResolution;
uniform sampler2D iChannel0;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  float result = 0.0;

  // Multi-scale noise sampling
  result += texture2D(iChannel0, uv * 1.1 + vec2(iTime * -0.005)).r;
  result *= texture2D(iChannel0, uv * 0.9 + vec2(iTime * 0.005)).g;

  // Sharp sparkle definition
  result = pow(result, 12.0);

  // Amplification
  gl_FragColor = vec4(vec3(5.0) * result, 1.0);
}
```

**Key Techniques**:

1. **Multi-Scale Sampling**:
   - Samples at 1.1x and 0.9x scales
   - Creates varying sparkle sizes

2. **Bidirectional Animation**:
   - First sample: `iTime * -0.005` (moves left)
   - Second sample: `iTime * 0.005` (moves right)
   - Creates dynamic, organic movement

3. **Power Function**:
   - `pow(result, 12.0)` creates sharp, defined sparkles
   - Higher exponent = sharper sparkles
   - Lower values create softer glow

4. **Amplification**:
   - Multiply by 5.0 for brightness
   - Adjustable via intensity prop (future enhancement)

## Noise Texture Generation

```typescript
function generateNoiseTexture(size = 512): THREE.DataTexture {
  const data = new Uint8Array(size * size * 4);

  for (let i = 0; i < size * size; i++) {
    const stride = i * 4;
    const r = Math.random() * 255;
    const g = Math.random() * 255;
    const b = Math.random() * 255;

    data[stride] = r;
    data[stride + 1] = g;
    data[stride + 2] = b;
    data[stride + 3] = 255;
  }

  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  return texture;
}
```

**Properties**:
- **Size**: 512x512 (262,144 pixels)
- **Format**: RGBA (4 channels)
- **Wrapping**: RepeatWrapping (seamless tiling)
- **Filtering**: LinearFilter (smooth interpolation)
- **Generation**: Random RGB values per pixel

## Performance Considerations

### GPU Optimization

1. **Shader Compilation**: Once at mount
2. **Texture Generation**: Memoized, single allocation
3. **Uniform Updates**: Only time and resolution
4. **Geometry**: Simple plane (2 triangles)

### Memory Usage

```
Noise Texture: 512 × 512 × 4 bytes = 1 MB
Shader Program: ~2 KB
Geometry Buffers: ~1 KB
Total: ~1 MB
```

### Frame Budget

```
Vertex Shader: ~0.1ms
Fragment Shader: ~0.5ms (1920×1080)
Uniform Updates: <0.01ms
Total: <1ms per frame (@60fps)
```

## CSS Integration

```css
.custom-bg {
  position: fixed;
  z-index: 0;
  inset: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0.5;
  mix-blend-mode: lighten;
  scale: 1.25;
  pointer-events: none;
}
```

**Properties Explained**:

- `fixed`: Overlay entire viewport
- `z-index: 0`: Behind hero content
- `opacity: 0.5`: Subtle effect
- `mix-blend-mode: lighten`: Additive blending
- `scale: 1.25`: Slight zoom for edge coverage
- `pointer-events: none`: Don't block interactions

## Props API

```typescript
interface GlitterFinalProps {
  speed?: number;         // Default: 1
  intensity?: number;     // Default: 5.0
  className?: string;     // Additional classes
}
```

### Speed

Controls animation speed via `iTime` multiplier.

```typescript
// Slow motion
<GlitterFinal speed={0.5} />

// Normal speed
<GlitterFinal speed={1} />

// Fast motion
<GlitterFinal speed={2} />
```

**Technical**: Multiplies `state.clock.elapsedTime` before passing to shader.

### Intensity

**Note**: Currently not implemented in shader. Future enhancement would multiply final result:

```glsl
gl_FragColor = vec4(vec3(intensity) * result, 1.0);
```

### ClassName

Append additional Tailwind or custom CSS classes:

```typescript
<GlitterFinal className="opacity-30 dark:opacity-70" />
```

## Browser Compatibility

| Feature | Requirement | Fallback |
|---------|------------|----------|
| WebGL 1.0 | Required | None |
| GLSL ES 1.0 | Required | None |
| Float Textures | Optional | Works without |
| Linear Filtering | Optional | Pixelated look |

**Supported Browsers**:
- Chrome 56+
- Firefox 51+
- Safari 12+
- Edge 79+

**Unsupported**: IE11 (no WebGL support)

## Customization Examples

### Slower, Subtle Effect

```typescript
<GlitterFinal
  speed={0.3}
  className="opacity-30"
/>
```

### Fast, Intense Effect

```typescript
<GlitterFinal
  speed={2}
  className="opacity-70"
/>
```

### Dark Mode Adjustment

```typescript
<GlitterFinal
  speed={0.75}
  className="opacity-40 dark:opacity-60 dark:mix-blend-screen"
/>
```

## Troubleshooting

### No Sparkles Visible

**Check**:
1. WebGL support: `navigator.gpu` or check browser console
2. Canvas rendering: Inspect element, verify canvas exists
3. Z-index conflicts: Ensure glitter is behind content
4. Opacity: Check if opacity is too low

### Performance Issues

**Solutions**:
1. Reduce noise texture size: `generateNoiseTexture(256)`
2. Lower speed: `speed={0.5}`
3. Simplify shader: Remove one texture sample
4. Disable on mobile: Conditional rendering

```typescript
const isMobile = window.innerWidth < 768;
{!isMobile && <GlitterFinal />}
```

### Sparkles Too Sharp/Soft

**Adjust power function** in fragment shader:

```glsl
// Sharper sparkles
result = pow(result, 16.0);

// Softer sparkles
result = pow(result, 8.0);
```

## Advanced Modifications

### Color Tinting

Add color multiplication in fragment shader:

```glsl
vec3 tint = vec3(1.0, 0.8, 0.9); // Pink tint
gl_FragColor = vec4(tint * vec3(5.0) * result, 1.0);
```

### Sparkle Size Variation

Modify sampling scales:

```glsl
// Larger sparkles
result += texture2D(iChannel0, uv * 0.5 + vec2(iTime * -0.005)).r;

// Smaller sparkles
result += texture2D(iChannel0, uv * 2.0 + vec2(iTime * -0.005)).r;
```

### Animation Direction

Change time multipliers:

```glsl
// Vertical movement
result += texture2D(iChannel0, uv + vec2(0.0, iTime * -0.005)).r;

// Diagonal movement
result += texture2D(iChannel0, uv + vec2(iTime * -0.003, iTime * 0.003)).r;
```

## Dependencies

```json
{
  "three": "^0.181.0",
  "@react-three/fiber": "^9.4.0",
  "@types/three": "^0.181.0"
}
```

## File Size Impact

```
three: ~800 KB (minified)
@react-three/fiber: ~100 KB (minified)
Component code: ~3 KB

Total bundle increase: ~900 KB
```

**Optimization**: Use tree-shaking and code splitting for production.

## Future Enhancements

1. **Intensity Prop Implementation**
   - Wire intensity to shader uniform
   - Add UI control

2. **Color Customization**
   - Add `color` prop
   - Support gradient sparkles

3. **Pattern Variations**
   - Preset patterns (snow, stars, rain)
   - Custom noise functions

4. **Performance Modes**
   - Low/Medium/High quality presets
   - Automatic mobile detection

5. **Interaction**
   - Mouse-reactive sparkles
   - Click effects

---

**Created for 21st component library**
*Technical documentation for GlitterFinal WebGL shader component*
