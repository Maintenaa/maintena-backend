import { dataSource } from "../../database/data-source";
import { Location } from "../../database/entities";
import type { Static } from "elysia";
import { createLocationSchema, updateLocationSchema } from "./location.schema";
import { createError } from "../common/common.service";

const locationRepo = dataSource.getRepository(Location);

export async function createLocation(
  body: Static<typeof createLocationSchema> & { company_id: number }
) {
  const location = new Location();
  location.name = body.name;
  location.company_id = body.company_id;

  if (body.parent_id) {
    const parent = await locationRepo.findOne({
      where: { id: body.parent_id, company_id: body.company_id },
    });
    if (!parent) throw createError("Parent location not found", 404);
    location.parent = parent;
  }

  return await locationRepo.save(location);
}

export async function getLocations(company_id: number) {
  return await locationRepo.find({
    where: { company: { id: company_id } },
  });
}

export async function getLocationById(id: number, company_id: number) {
  const location = await locationRepo.findOne({
    where: { id, company_id },
    relations: ["parent", "children"],
  });
  if (!location) throw createError("Location not found", 404);
  return location;
}

export async function updateLocation(
  id: number,
  body: Static<typeof updateLocationSchema>,
  company_id: number
) {
  const location = await locationRepo.findOne({ where: { id, company_id } });
  if (!location) throw createError("Location not found", 404);

  location.name = body.name;

  if (body.parent_id !== undefined) {
    if (body.parent_id) {
      const parent = await locationRepo.findOne({
        where: { id: body.parent_id, company_id },
      });
      if (!parent) throw createError("Parent location not found", 404);
      location.parent = parent;
    } else {
      location.parent = null;
    }
  }

  return await locationRepo.save(location);
}

export async function deleteLocation(id: number, company_id: number) {
  const location = await locationRepo.findOne({ where: { id, company_id } });
  if (!location) throw createError("Location not found", 404);

  await locationRepo.delete(id);
  return { message: "Location deleted" };
}
