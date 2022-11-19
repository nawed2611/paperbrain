from flask import Flask, request
import arxiv
from flask_cors import CORS, cross_origin
import os


app = Flask(__name__)
CORS(app, support_credentials=True)


@cross_origin(supports_credentials=True)
@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        query = request.json
        print(query)

        user_query = query['query']
        print(user_query)
        
        search_paper = arxiv.Search(
            query=user_query,
            max_results=100
        )

        papers_list = []

        for result in search_paper.results():
            papers_list.append([result.title,result.pdf_url,result.summary,result.authors])
        
        print(papers_list)
        return {"bruh":papers_list}


    return "<h1>This is working</h1>"


# @app.route('/explain', methods=['GET', 'POST'])
# def explain():
    
#     if request.method == 'POST':
#         excerpt = request.json




#         response = openai.Completion.create(
#         model="text-davinci-002",
#         prompt="Explain the following excerpt for a first-grade student in very simple terms:\nExample:\nPrompt:\nRobotic surgeries are carried out by the help of surgeons, and not solely robots as the name would suggest. However, in place of the traditional equipment which is primarily hand-held the doctors utilizes a machine which saves the hassle of making fine to significantly large incisions in order to operate depending upon the type of surgery. The surgeon remotely controls the machine's tools with joysticks and foot controls while keeping watch on the surgical site on a high-definition monitor that displays a three-dimensional representation of the process.\n\nResult:\nThe text is explaining that robotic surgeries are not just done by robots, but with the help of surgeons as well. The surgeon uses a machine to help with the surgery instead of traditional hand-held equipment. The machine is controlled by the surgeon with joysticks and foot controls. The surgeon can also see the surgical site on a high-definition monitor.\n\nPrompt: \nMost competitive neural sequence transduction models have an encoder-decoder structure [5, 2, 35]. Here, the encoder maps an input sequence of symbol representations (x1,...,xn) to a sequence of continuous representations z = (z1,...,zn). Given z, the decoder then generates an output sequence (y1,...,ym) of symbols one element at a time. At each step the model is auto-regressive [10], consuming the previously generated symbols as additional input when generating the next.\n\nResult:\nThis text is discussing the structure of a neural sequence transduction model. The model has an encoder and a decoder. The encoder takes in a sequence of symbols and maps them to a sequence of continuous representations. The decoder then takes that sequence of continuous representations and generates an output sequence of symbols, one element at a time. The model is auto-regressive, which means that it consumes the previously generated symbols as additional input when generating the next.\n\nPrompt:\nThe Transformer uses multi-head attention in three different ways: • In 'encoder-decoder attention' layers, the queries come from the previous decoder layer,and the memory keys and values come from the output of the encoder. This allows every position in the decoder to attend over all positions in the input sequence. This mimics the typical encoder-decoder attention mechanisms in sequence-to-sequence models such as [38, 2, 9]. • The encoder contains self-attention layers. In a self-attention layer all of the keys, values and queries come from the same place, in this case, the output of the previous layer in the encoder. Each position in the encoder can attend to all positions in the previous layer of the encoder\n\nResult:\nThe Transformer uses multi-head attention in three different ways: 1. In 'encoder-decoder attention' layers, the queries come from the previous decoder layer, and the memory keys and values come from the output of the encoder. This allows every position in the decoder to attend over all positions in the input sequence. This mimics the typical encoder-decoder attention mechanisms in sequence-to-sequence models. 2. The encoder contains self-attention layers. In a self-attention layer, all of the keys, values, and queries come from the same place - in this case, the output of the previous layer in the encoder. This allows each position in the encoder to attend to all positions in the previous layer of the encoder. 3. Similarly, self-attention layers in the decoder allow each position in the decoder to attend to all positions in the decoder up to and including that position. To prevent leftward information flow in the decoder and preserve the auto-regressive property, the input of the softmax is masked (set to -inf) for all values that correspond to illegal connections.\n\n\nPrompt:\nA similar starting point is presented by Montavon et al. (2011). In that particular case, the authors use kernel PCA to project the features of a given layer onto a new representation which will then be used to fit the best linear classifier. They use a radial basis function as kernel, and they choose to project the features of individual layers by using the d leading eigenvectors of the kernel PCA decomposition. They investigate the effects that d has on the quality of the linear classifier.\n\nResult:\nThe text is discussing a study that used kernel PCA to find a new representation of data that was then used to fit a linear classifier. The study used a radial basis function as their kernel, and they looked at how the quality of the linear classifier changed as they varied the number of leading eigenvectors used (d).\n\nPrompt:\nIn the case of a binary classifier (say, detecting the presence or absence of a lion in a picture of the savannah like in Figure 1), we could say that there was at most one bit of information to be uncovered in the original image. Lion or no lion ? Here we are not interested in measuring the information about the pixels of an image that we want to reconstruct. That would be a different problem\n\nResult:\nThis text is saying that, in the case of a binary classifier (a machine learning model that can only output two possibilities, like \"lion\" or \"no lion\"), there is only one bit of information that needs to be uncovered in the original image. The machine learning model is not interested in measuring the information about the pixels of the image, because that would be a different problem.\n\nPrompt:\nThe family of ResNet models (He et al., 2016) are characterized by their large quantities of residual layers mapping essentially x \\mapsto↦ x + r(x). They have been very successful and there are various papers seeking to understand better how they work (Veit et al., 2016; Larsson et al., 2016; Singh et al., 2016).\n\nResult:\nThe family of ResNet models are characterized by their large quantities of residual layers. A residual layer is a layer where the output is the input plus a function of the input. So, essentially, the mapping is x $\\mapsto$ x + r(x). The ResNet models have been very successful and there are various papers seeking to understand better how they work.\n\nPrompt:\nWe purposefully selected a model that was pathologically deep so that it would fail to train under normal circumstances. We used 128 fully-connected layers of 128 hidden units to classify MNIST, which is not at all a model that we would recommend. We thought that something interesting might happen if we added a very long skip connection that bypasses the first half of the model completely (Figure 6a).\n\nResult:\nThe researchers wanted to see what would happen if they created a model that was \"pathologically deep\" - meaning, a model that was so deep that it would normally be unable to train. To do this, they used 128 fully-connected layers of 128 hidden units to classify MNIST. This is not a model that they would recommend using. However, they thought that something interesting might happen if they added a very long skip connection that bypasses the first half of the model completely.\n\nPrompt:\nIn the past few years, cryptocurrencies have gained significant public attention [13, 28]. The first and most prominent cryptocurrency is Bitcoin, proposed in 2008 by Satoshi Nakamoto [8, 19, 24]. While blockchains have proven to be suitable as distributed ledgers for recording transactions in Bitcoin and other cryptocurrencies [20, 24], blockchain technologies have also the potential to be applied in other use cases, e.g., the Internet of Things or business processes.\n\nResult:\nThe text is discussing how blockchain technology has been applied in cryptocurrencies, and how it has the potential to be applied in other areas as well.\n\nPrompt:\nIn order to select the most appropriate blockchain, users should be able to define particular selection metrics, which are then applied in order to assess how a blockchain matches the needs of the user. In the following, we present eight blockchain metrics relevant for the comparison of different blockchains. They can be categorized into cost-related metrics (M1-3), performance-related metrics (M4-5), security-related metrics (M6-7), and reputation (M8). Notably, the framework presented in this paper allows to extend the metric model by further metrics, if necessary.\n\nResult:\nThe text is explaining that there are eight different metrics that can be used to compare different blockchains. These metrics can be divided into four categories: cost-related, performance-related, security-related, and reputation. The framework presented in the paper allows for more metrics to be added if necessary.\n\nPrompt:\n\nResult:\nPrompt:\n\nResult:\nPrompt:\n\nResult:\nPrompt:\n\nResult:\n ",
#         temperature=0.7,
#         max_tokens=293,
#         top_p=1,
#         frequency_penalty=0,
#         presence_penalty=0
#         )





app.run(debug=True)