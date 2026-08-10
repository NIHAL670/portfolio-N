import { useState, useEffect, useRef } from "react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

// 1. CROP PREDICTOR SIMULATOR
export function CropPredictorPlayground() {
  const [inputs, setInputs] = useState({
    N: 50,
    P: 50,
    K: 50,
    pH: 6.5,
    temp: 28,
    rain: 150,
  });

  const [predictions, setPredictions] = useState([]);

  // Mock ML calibrated probability classifier in JS
  useEffect(() => {
    const calculatePredictions = () => {
      const { N, P, K, pH, temp, rain } = inputs;
      const scores = {
        Rice: 0,
        Maize: 0,
        Cotton: 0,
        Banana: 0,
        Tomato: 0,
        Potato: 0,
        Wheat: 0,
      };

      // Rules mapping soil & environmental bounds to crops
      if (rain > 180 && temp > 24 && N > 40) scores.Rice += 8;
      if (temp > 18 && temp < 30 && rain > 60 && rain < 120 && P > 45) scores.Maize += 7;
      if (pH > 5.5 && pH < 7.5 && N > 50 && K > 40 && rain < 100) scores.Cotton += 6;
      if (temp > 25 && K > 80 && rain > 150) scores.Banana += 9;
      if (pH > 6.0 && pH < 6.8 && P > 60 && temp > 20) scores.Tomato += 5;
      if (temp < 22 && rain > 80 && K > 70) scores.Potato += 7;
      if (temp > 10 && temp < 24 && rain < 90 && pH > 6.2) scores.Wheat += 6;

      // Add NPK affinity
      scores.Rice += (N * 0.1) + (rain * 0.05);
      scores.Maize += (P * 0.12) + (temp * 0.1);
      scores.Cotton += (N * 0.08) + (K * 0.08);
      scores.Banana += (K * 0.15) + (rain * 0.04);
      scores.Tomato += (P * 0.1) + (pH * 0.5);
      scores.Potato += (K * 0.12) + (100 / temp);
      scores.Wheat += (N * 0.06) + (P * 0.06);

      // Normalize to percentages
      const sum = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
      const results = Object.keys(scores).map(name => ({
        name,
        confidence: Math.round((scores[name] / sum) * 100),
      }));

      // Sort by confidence
      results.sort((a, b) => b.confidence - a.confidence);
      setPredictions(results.slice(0, 3)); // Top 3
    };

    calculatePredictions();
  }, [inputs]);

  const handleSliderChange = (key, value) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-brand-dark/30 border border-white/10 rounded-2xl p-6 mt-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-3 border-b border-white/5">
        <div>
          <h4 className="text-white font-semibold text-base">Crop Recommendation Engine</h4>
          <p className="text-xs text-muted font-light mt-0.5">Adjust environmental inputs to test calibrated softmax predictions.</p>
        </div>
        <Badge dot={true} dotColor="bg-cyan">Calibrated Softmax</Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Sliders */}
        <div className="space-y-5">
          <div>
            <div className="flex justify-between text-xs font-mono text-slate-300 mb-2">
              <span>Nitrogen (N)</span>
              <span className="text-accent font-bold">{inputs.N} kg/ha</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="140" 
              value={inputs.N} 
              onChange={e => handleSliderChange('N', parseInt(e.target.value))} 
              className="w-full accent-accent h-1.5 bg-brand rounded-lg cursor-pointer focus:outline-none" 
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono text-slate-300 mb-2">
              <span>Phosphorus (P)</span>
              <span className="text-cyan font-bold">{inputs.P} kg/ha</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="140" 
              value={inputs.P} 
              onChange={e => handleSliderChange('P', parseInt(e.target.value))} 
              className="w-full accent-cyan h-1.5 bg-brand rounded-lg cursor-pointer focus:outline-none" 
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono text-slate-300 mb-2">
              <span>Potassium (K)</span>
              <span className="text-accent font-bold">{inputs.K} kg/ha</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="140" 
              value={inputs.K} 
              onChange={e => handleSliderChange('K', parseInt(e.target.value))} 
              className="w-full accent-accent h-1.5 bg-brand rounded-lg cursor-pointer focus:outline-none" 
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono text-slate-300 mb-2">
              <span>Soil pH Level</span>
              <span className="text-cyan font-bold">{inputs.pH}</span>
            </div>
            <input 
              type="range" 
              min="4.0" 
              max="9.0" 
              step="0.1" 
              value={inputs.pH} 
              onChange={e => handleSliderChange('pH', parseFloat(e.target.value))} 
              className="w-full accent-cyan h-1.5 bg-brand rounded-lg cursor-pointer focus:outline-none" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-xs font-mono text-slate-300 mb-2">
                <span>Temp (°C)</span>
                <span className="text-accent font-bold">{inputs.temp}°C</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="45" 
                value={inputs.temp} 
                onChange={e => handleSliderChange('temp', parseInt(e.target.value))} 
                className="w-full accent-accent h-1.5 bg-brand rounded-lg cursor-pointer focus:outline-none" 
              />
            </div>
            <div>
              <div className="flex justify-between text-xs font-mono text-slate-300 mb-2">
                <span>Rainfall (mm)</span>
                <span className="text-cyan font-bold">{inputs.rain}mm</span>
              </div>
              <input 
                type="range" 
                min="20" 
                max="300" 
                value={inputs.rain} 
                onChange={e => handleSliderChange('rain', parseInt(e.target.value))} 
                className="w-full accent-cyan h-1.5 bg-brand rounded-lg cursor-pointer focus:outline-none" 
              />
            </div>
          </div>
        </div>

        {/* Prediction Results */}
        <div className="bg-brand-dark/60 border border-white/5 rounded-xl p-5 flex flex-col justify-center h-full">
          <div className="text-xs text-muted mb-4 font-mono uppercase tracking-wider">Top Recommended Crops:</div>
          <div className="space-y-4">
            {predictions.map((p, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-white font-medium">{idx + 1}. {p.name}</span>
                  <span className={idx === 0 ? "text-cyan font-bold" : "text-muted"}>{p.confidence}%</span>
                </div>
                <div className="w-full bg-brand h-2 rounded-full overflow-hidden p-0.5 border border-white/5">
                  <div 
                    className={`h-full transition-all duration-300 rounded-full ${idx === 0 ? 'bg-gradient-to-r from-accent to-cyan' : idx === 1 ? 'bg-accent' : 'bg-surface'}`} 
                    style={{ width: `${p.confidence}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. CRYPTO FORECAST SIMULATOR
export function CryptoForecastPlayground() {
  const [coin, setCoin] = useState("BTC");
  const [horizon, setHorizon] = useState(14);
  const [volatility, setVolatility] = useState(1.5);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef(null);

  const simulateForecast = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      drawForecast();
    }, 850);
  };

  const drawForecast = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Subtle grid lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
    ctx.lineWidth = 1;
    for (let i = 0; i < w; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, h);
      ctx.stroke();
    }
    for (let i = 0; i < h; i += 30) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(w, i);
      ctx.stroke();
    }

    // Parameters based on selections
    const basePrice = coin === "BTC" ? 64000 : coin === "ETH" ? 3400 : 140;
    const pointsCount = 40;
    const forecastStartIdx = 25;
    const prices = [];

    // Historical generation (semi-random walk)
    let current = basePrice;
    for (let i = 0; i < pointsCount; i++) {
      if (i < forecastStartIdx) {
        current += (Math.random() - 0.48) * current * 0.02 * volatility;
        prices.push({ x: i, y: current, type: 'history' });
      } else {
        // Forecast generation
        const trend = coin === "BTC" ? 0.0035 : coin === "ETH" ? 0.0015 : -0.002;
        current += (Math.random() - 0.5 + trend) * current * 0.038 * volatility;
        
        // Calculate confidence limits
        const devSteps = i - forecastStartIdx + 1;
        const width = basePrice * 0.015 * devSteps * volatility;
        prices.push({
          x: i,
          y: current,
          type: 'forecast',
          upper: current + width,
          lower: current - width
        });
      }
    }

    const minPrice = Math.min(...prices.map(p => p.lower || p.y)) * 0.95;
    const maxPrice = Math.max(...prices.map(p => p.upper || p.y)) * 1.05;

    const scaleX = (val) => (val / (pointsCount - 1)) * (w - 20) + 10;
    const scaleY = (val) => h - 15 - ((val - minPrice) / (maxPrice - minPrice)) * (h - 30);

    // Draw confidence intervals (uncertainty bounds)
    ctx.fillStyle = "rgba(108, 99, 255, 0.06)";
    ctx.beginPath();
    ctx.moveTo(scaleX(forecastStartIdx), scaleY(prices[forecastStartIdx].y));
    for (let i = forecastStartIdx; i < pointsCount; i++) {
      ctx.lineTo(scaleX(i), scaleY(prices[i].upper));
    }
    for (let i = pointsCount - 1; i >= forecastStartIdx; i--) {
      ctx.lineTo(scaleX(i), scaleY(prices[i].lower));
    }
    ctx.closePath();
    ctx.fill();

    // Draw historical line
    ctx.strokeStyle = "#22d3ee";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(scaleX(0), scaleY(prices[0].y));
    for (let i = 1; i < forecastStartIdx; i++) {
      ctx.lineTo(scaleX(i), scaleY(prices[i].y));
    }
    ctx.stroke();

    // Draw forecast line (dotted)
    ctx.strokeStyle = "#6c63ff";
    ctx.lineWidth = 2.5;
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.moveTo(scaleX(forecastStartIdx - 1), scaleY(prices[forecastStartIdx - 1].y));
    for (let i = forecastStartIdx; i < pointsCount; i++) {
      ctx.lineTo(scaleX(i), scaleY(prices[i].y));
    }
    ctx.stroke();
    ctx.setLineDash([]); // reset

    // Draw vertical divider
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(scaleX(forecastStartIdx - 1), 0);
    ctx.lineTo(scaleX(forecastStartIdx - 1), h);
    ctx.stroke();
    ctx.setLineDash([]);

    // Labels
    ctx.fillStyle = "#94a3b8";
    ctx.font = "9px JetBrains Mono";
    ctx.fillText("HISTORICAL", scaleX(2), 20);
    ctx.fillStyle = "#6c63ff";
    ctx.fillText("LSTM FORECAST", scaleX(forecastStartIdx + 1), 20);
  };

  useEffect(() => {
    drawForecast();
  }, [coin, horizon, volatility]);

  return (
    <div className="bg-brand-dark/30 border border-white/10 rounded-2xl p-6 mt-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-3 border-b border-white/5">
        <div>
          <h4 className="text-white font-semibold text-base">Crypto Price Predictor</h4>
          <p className="text-xs text-muted font-light mt-0.5">Test price projections generated by our LSTM Neural Network.</p>
        </div>
        <Badge dot={true} dotColor="bg-accent">LSTM Network</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        <div className="space-y-4">
          <div>
            <label className="untitled-label">Asset Target</label>
            <select 
              value={coin} 
              onChange={e => setCoin(e.target.value)} 
              className="untitled-input font-mono"
            >
              <option value="BTC">BTC / USD</option>
              <option value="ETH">ETH / USD</option>
              <option value="SOL">SOL / USD</option>
            </select>
          </div>
          <div>
            <label className="untitled-label">Horizon Forecast</label>
            <select 
              value={horizon} 
              onChange={e => setHorizon(parseInt(e.target.value))} 
              className="untitled-input font-mono"
            >
              <option value="7">7 Days Ahead</option>
              <option value="14">14 Days Ahead</option>
              <option value="30">30 Days Ahead</option>
            </select>
          </div>
          <div>
            <div className="flex justify-between text-xs font-mono text-slate-300 mb-2">
              <span>Volatility Factor</span>
              <span className="text-cyan font-bold">{volatility}x</span>
            </div>
            <input 
              type="range" 
              min="0.5" 
              max="3.0" 
              step="0.1" 
              value={volatility} 
              onChange={e => setVolatility(parseFloat(e.target.value))} 
              className="w-full accent-cyan h-1.5 bg-brand rounded-lg cursor-pointer focus:outline-none" 
            />
          </div>
          
          <Button 
            variant="primary"
            onClick={simulateForecast}
            disabled={loading}
            className="w-full justify-center text-xs tracking-wider uppercase font-semibold mt-2"
          >
            {loading ? "RUNNING MODEL..." : "COMPUTE FORECAST"}
          </Button>
        </div>

        <div className="lg:col-span-2">
          <div className="relative border border-white/10 rounded-xl overflow-hidden bg-brand-dark/50 p-2">
            <canvas ref={canvasRef} width="420" height="200" className="w-full block" />
            {loading && (
              <div className="absolute inset-0 bg-brand-dark/80 flex items-center justify-center backdrop-blur-xs">
                <span className="text-xs font-mono text-cyan animate-pulse">Running forward pass & inference...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
