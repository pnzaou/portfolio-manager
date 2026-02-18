import { Response, Request } from 'express';
import cloudinary from '../config/cloudinary';
import { AuthRequest } from '../types';
import { prisma } from '../lib/prisma';


// Créer un projet
export const createProject = async ( req: AuthRequest, res: Response ): Promise<void> => {
  try {
    const { name, description, link, technologies } = req.body;
    const files = req.files as Express.Multer.File[];

    if (!name || !description) {
      res.status(400).json({ message: "Nom et description requis" });
      return;
    }

    // Créer le projet
    const project = await prisma.project.create({
      data: {
        name,
        description,
        link: link || null,
        userId: req.userId!,
      },
    });

    // Upload des images sur Cloudinary
    if (files && files.length > 0) {
      const uploadPromises = files.map((file) => {
        return new Promise<{ url: string; publicId: string }>(
          (resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              { folder: "portfolio-projects" },
              (error, result) => {
                if (error) reject(error);
                else
                  resolve({
                    url: result!.secure_url,
                    publicId: result!.public_id,
                  });
              },
            );
            uploadStream.end(file.buffer);
          },
        );
      });

      const uploadedImages = await Promise.all(uploadPromises);

      await prisma.image.createMany({
        data: uploadedImages.map((img) => ({
          url: img.url,
          publicId: img.publicId,
          projectId: project.id,
        })),
      });
    }

    // Ajouter les technologies (gère 1 ou plusieurs)
    if (technologies) {
      const techArray = Array.isArray(technologies)
        ? technologies
        : [technologies];
      if (techArray.length > 0) {
        await prisma.technology.createMany({
          data: techArray.map((tech: string) => ({
            name: tech,
            projectId: project.id,
          })),
        });
      }
    }

    // Récupérer le projet complet
    const fullProject = await prisma.project.findUnique({
      where: { id: project.id },
      include: {
        images: true,
        technologies: true,
      },
    });

    res.status(201).json({
      message: "Projet créé avec succès",
      project: fullProject,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Lister tous les projets
export const getAllProjects = async ( req: AuthRequest, res: Response ): Promise<void> => {
  try {
    const projects = await prisma.project.findMany({
      where: { userId: req.userId },
      include: {
        images: true,
        technologies: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({ message: 'Projets récupérés avec succès', projects });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Récupérer un projet
export const getProject = async ( req: AuthRequest, res: Response ): Promise<void> => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findFirst({
      where: {
        id,
        userId: req.userId,
      },
      include: {
        images: true,
        technologies: true,
      },
    });

    if (!project) {
      res.status(404).json({ message: 'Projet non trouvé' });
      return;
    }

    res.status(200).json({ message: 'Projets récupérés avec succès', project });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Modifier un projet
export const updateProject = async ( req: AuthRequest, res: Response ): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, link, technologies } = req.body;
    const files = req.files as Express.Multer.File[];

    const project = await prisma.project.findFirst({
      where: { id, userId: req.userId },
    });

    if (!project) {
      res.status(404).json({ message: "Projet non trouvé" });
      return;
    }

    // Mise à jour du projet
    await prisma.project.update({
      where: { id },
      data: {
        name: name || project.name,
        description: description || project.description,
        link: link !== undefined ? link : project.link,
      },
    });

    // Upload nouvelles images si présentes
    if (files && files.length > 0) {
      const uploadPromises = files.map((file) => {
        return new Promise<{ url: string; publicId: string }>(
          (resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              { folder: "portfolio-projects" },
              (error, result) => {
                if (error) reject(error);
                else
                  resolve({
                    url: result!.secure_url,
                    publicId: result!.public_id,
                  });
              },
            );
            uploadStream.end(file.buffer);
          },
        );
      });

      const uploadedImages = await Promise.all(uploadPromises);

      await prisma.image.createMany({
        data: uploadedImages.map((img) => ({
          url: img.url,
          publicId: img.publicId,
          projectId: id,
        })),
      });
    }

    // Mise à jour des technologies (gère 1 ou plusieurs)
    if (technologies !== undefined) {
      await prisma.technology.deleteMany({ where: { projectId: id } });

      const techArray = Array.isArray(technologies)
        ? technologies
        : [technologies];
      if (techArray.length > 0) {
        await prisma.technology.createMany({
          data: techArray.map((tech: string) => ({
            name: tech,
            projectId: id,
          })),
        });
      }
    }

    const updatedProject = await prisma.project.findUnique({
      where: { id },
      include: {
        images: true,
        technologies: true,
      },
    });

    res.json({
      message: "Projet mis à jour avec succès",
      project: updatedProject,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Supprimer un projet
export const deleteProject = async ( req: AuthRequest, res: Response ): Promise<void> => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findFirst({
      where: { id, userId: req.userId },
      include: { images: true },
    });

    if (!project) {
      res.status(404).json({ message: 'Projet non trouvé' });
      return;
    }

    // Supprimer les images de Cloudinary
    const deletePromises = project.images.map((img) =>
      cloudinary.uploader.destroy(img.publicId)
    );
    await Promise.all(deletePromises);

    // Supprimer le projet (cascade va supprimer images et technologies)
    await prisma.project.delete({ where: { id } });

    res.status(200).json({ message: 'Projet supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Supprimer une image spécifique
export const deleteImage = async ( req: AuthRequest, res: Response ): Promise<void> => {
  try {
    const { imageId } = req.params;

    const image = await prisma.image.findUnique({
      where: { id: imageId },
      include: { project: true },
    });

    if (!image || image.project.userId !== req.userId) {
      res.status(404).json({ message: 'Image non trouvée' });
      return;
    }

    await cloudinary.uploader.destroy(image.publicId);
    await prisma.image.delete({ where: { id: imageId } });

    res.status(200).json({ message: 'Image supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Récupérer toutes les technologies utilisées
export const getAllTechnologies = async ( req: AuthRequest, res: Response ): Promise<void> => {
  try {
    const technologies = await prisma.technology.findMany({
      where: {
        project: {
          userId: req.userId,
        },
      },
      distinct: ['name'],
      select: {
        name: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    res.json({ technologies: technologies.map(t => t.name) });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Récupérer les projets publics avec pagination
export const getPublicProjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const skip = (page - 1) * limit;

    // Compter le total de projets
    const totalProjects = await prisma.project.count();

    // Récupérer les projets paginés
    const projects = await prisma.project.findMany({
      include: {
        images: true,
        technologies: true,
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    });

    // Calculer les métadonnées de pagination
    const totalPages = Math.ceil(totalProjects / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    res.json({
      projects,
      pagination: {
        currentPage: page,
        totalPages,
        totalProjects,
        projectsPerPage: limit,
        hasNextPage,
        hasPrevPage,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};