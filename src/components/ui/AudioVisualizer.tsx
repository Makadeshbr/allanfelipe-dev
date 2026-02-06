'use client';

interface AudioVisualizerProps {
    className?: string;
    barCount?: number;
    color?: string;
    size?: 'sm' | 'md' | 'lg';
}

export function AudioVisualizer({
    className = '',
    barCount = 5,
    color,
    size = 'md',
}: AudioVisualizerProps) {
    const heights = {
        sm: 'h-4',
        md: 'h-8',
        lg: 'h-12',
    };

    const barWidth = {
        sm: 'w-0.5',
        md: 'w-[3px]',
        lg: 'w-1',
    };

    const gaps = {
        sm: 'gap-[2px]',
        md: 'gap-1',
        lg: 'gap-1.5',
    };

    const animations = [
        'audioBar1 1.2s ease-in-out infinite',
        'audioBar2 1.5s ease-in-out infinite 0.1s',
        'audioBar3 1.1s ease-in-out infinite 0.2s',
        'audioBar4 1.4s ease-in-out infinite 0.15s',
        'audioBar1 1.3s ease-in-out infinite 0.25s',
        'audioBar2 1.6s ease-in-out infinite 0.05s',
        'audioBar3 1.2s ease-in-out infinite 0.3s',
    ];

    return (
        <div
            className={`flex items-end ${gaps[size]} ${heights[size]} ${className}`}
            aria-hidden="true"
        >
            {Array.from({ length: barCount }).map((_, i) => (
                <div
                    key={i}
                    className={`${barWidth[size]} rounded-full`}
                    style={{
                        backgroundColor: color || 'var(--accent-primary)',
                        animation: animations[i % animations.length],
                        height: '40%',
                        opacity: 0.6,
                    }}
                />
            ))}
        </div>
    );
}

export default AudioVisualizer;
