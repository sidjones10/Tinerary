# Tinerary Backend

This directory contains the backend code for the Tinerary application. The backend is built using Next.js API routes and Supabase for database and authentication.

## Directory Structure

- `models/`: Database models and data access functions
- `services/`: External service integrations (auth, storage, notifications, etc.)
- `middleware/`: Request processing middleware (auth, validation, rate limiting)
- `utils/`: Utility functions
- `types/`: TypeScript type definitions

## Key Features

- User authentication and management
- Itinerary CRUD operations
- Activity management
- Expense tracking
- File storage for images
- Notifications
- Geocoding for locations

## Getting Started

The backend is integrated with the Next.js application. To use it:

1. Import the required functions from the appropriate modules
2. Use the models to interact with the database
3. Use the services to interact with external services
4. Use the utilities for common operations

Example:

```typescript
import { getUserItineraries } from '@/backend/models/itinerary';
import { requireAuth } from '@/backend/services/auth';

// In a server component or API route
const user = await requireAuth();
const itineraries = await getUserItineraries(user.id);

