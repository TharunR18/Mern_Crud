import notes from "../models/noteModel.js"


export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body
        const note = await notes.create({
            title,
            content
        })
        res.status(201).json(note)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getNote = async (req, res) => {
    try {
        const note = await notes.find()
        res.status(200).json(note)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export const deleteNote = async (req, res) => {
    try {
        const note = await notes.findByIdAndDelete(req.params.id);

        if (!note) {
            res.status(404).json({ message: "note not found" })
        }

        res.status(200).json({ message: "note was deleted successfully" })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body
        const note = await notes.findByIdAndUpdate(req.params.id,

            {
                title,
                content
            },

            {
                new: true
            }
        );

        if (!note) {
            res.status(404).json({ message: "note not found" })
        }

        res.status(200).json(note)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}