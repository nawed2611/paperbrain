import { Paper } from '../models/paper';
import { User } from '../models/user';

export const starPaper = (req, res) => {
    const { paperId, userId } = req.body;
    const paper = new Paper(paperId);
    const user = new User(userId);
    paper.star(user);
    res.json({ message: 'Paper starred' });
}

export const unstarPaper = (req, res) => {
    const { paperId, userId } = req.body;
    const paper = new Paper(paperId);
    const user = new User(userId);
    paper.unstar(user);
    res.json({ message: 'Paper unstarred' });
}

export const getStarredPapers = (req, res) => {
    const { userId } = req.body;
    const user = new User(userId);
    const starredPapers = user.getStarredPapers();
    res.json({ papers: starredPapers });
}