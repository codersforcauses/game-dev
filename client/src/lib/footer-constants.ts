/**
 * Constants for Footer component
 * Centralized location for magic numbers to improve maintainability
 */

// Gradient and visual effects
export const GRADIENT_CIRCLE_SIZE = 15; // px - size of radial gradient circle
export const GRADIENT_OPACITY_HOVERING = 0.3;
export const GRADIENT_OPACITY_DEFAULT = 0.2;
export const GRADIENT_TRANSITION_DURATION = 0.5; // seconds

// Mouse interaction
export const MOUSE_OFFSET_MULTIPLIER = 0.3; // How much particles react to mouse movement
export const MOUSE_CENTER_OFFSET = 50; // Percentage offset for centering calculations

// Particle system
export const PARTICLE_COUNT = 22;
export const PARTICLE_SIZE_MIN = 2;
export const PARTICLE_SIZE_MAX = 3;
export const PARTICLE_DELAY_MAX = 4; // seconds
export const PARTICLE_DURATION_MIN = 3; // seconds
export const PARTICLE_DURATION_MAX = 3; // seconds (added to min for range)
export const PARTICLE_DEFAULT_ALPHA = 0.6;

// Particle colour opacities
export const PARTICLE_COLOUR_ALPHA_LIGHT_1 = 0.5;
export const PARTICLE_COLOUR_ALPHA_LIGHT_2 = 0.4;
export const PARTICLE_COLOUR_ALPHA_LIGHT_ALT = 0.4;

// Network canvas particles
export const NETWORK_PARTICLE_VELOCITY_MULTIPLIER = 0.15;
export const NETWORK_PARTICLE_SIZE_MIN = 1.5;
export const NETWORK_PARTICLE_SIZE_MAX = 1.5; // Added to min for range
export const NETWORK_CONNECTION_DISTANCE = 150; // px - max distance for particle connections
export const NETWORK_CONNECTION_MAX_PER_PARTICLE = 2;
export const NETWORK_CONNECTION_OPACITY_BASE = 0.25;
export const NETWORK_CONNECTION_OPACITY_MULTIPLIER = 1.5;
export const NETWORK_MOUSE_CONNECTION_DISTANCE = 120; // px
export const NETWORK_MOUSE_CONNECTION_OPACITY_BASE = 0.4;
export const NETWORK_MOUSE_CONNECTION_OPACITY_MULTIPLIER = 0.5;
export const NETWORK_LINE_WIDTH = 1.5;
export const NETWORK_MOUSE_LINE_WIDTH = 2;

// Motion colour opacities
export const MOTION_COLOUR_MOUSE_GRAD_START_ALPHA = 0.3;
export const MOTION_COLOUR_MOUSE_GRAD_END_ALPHA = 0.3;
export const MOTION_COLOUR_SOCIAL_BG_HOV_ALPHA = 0.1;
export const MOTION_COLOUR_SOCIAL_BORDER_HOV_ALPHA = 0.5;

// Spring physics for mouse tracking
export const SPRING_DAMPING = 50;
export const SPRING_STIFFNESS = 100;

// Animation values
export const SOCIAL_ICON_HOVER_SCALE = 1.1;
export const SOCIAL_ICON_HOVER_Y = -4;
export const SOCIAL_ICON_TAP_SCALE = 0.95;
export const SOCIAL_ICON_ROTATE_DEGREES = 12;
export const SOCIAL_ICON_SPRING_STIFFNESS = 400;
export const SOCIAL_ICON_SPRING_DAMPING = 17;

// Default dimensions
export const DEFAULT_FOOTER_WIDTH = 1920;
export const DEFAULT_FOOTER_HEIGHT = 400;
