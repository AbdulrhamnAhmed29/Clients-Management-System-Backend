import {Tenant} from "../model/model.js"
export const createTenantController = async (req, res) => {
    const payload = req.body;
    try {
        const newTenant = await Tenant.create(payload)
        return res.status(201).json({
            success: true,
            message: "Tenant created successfully",
            data: newTenant,
        });

    } catch (error) {
        return next(error);
    }
}